import React, {Component, Fragment} from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'
import Modal from '../../components/Modal'
import PropTypes from 'prop-types'

class Home extends Component {
  static contextTypes ={
    store:PropTypes.object.isRequired
  }
  constructor(props) {
    //console.log("Home Props", props);
    super();

    this.state = {
      novoTweet: '',
      tweets: [], 
      tweetAtivo: {}
    }

  }
  componentWillMount(){
    this.context.store.subscribe(()=> {
      this.setState({
        tweets: this.context.store.getState()
      })
    })
  }
  componentDidMount() {
    fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('token')}`)
      .then(res => res.json())
      .then(tweetsDoServidor => {

        this.context.store.dispatch({type:'CARREGA_TWEETS', tweets: tweetsDoServidor})
      });
  }

  removeTweet = (idDoTweet) => {
    /* Tweet sera removido primeiro do servidor */
    fetch(`http://localhost:3001/tweets/${idDoTweet}?X-AUTH-TOKEN=${localStorage.getItem('token')}`, {method: 'DELETE'})
      .then(res => res.json())
      .then(res => {
        console.log(res);
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    * Se o id do tweet do estado (this.state.tweets) atual for      *
    * diferente do id passado pela função, ele continua na lista.   *
    * O idDoTweet que for igual não sera incluido no novo array,    *
    * por isso será removido.                                       *
    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
        const tweetsAtualizados = this
          .state
          .tweets
          .filter((tweetAtual) => tweetAtual._id !== idDoTweet);

        /*  O estado é atualizado com os tweets que passaram no filtro,
            assim atualizando o estado e a página                   */

        this.setState({tweets: tweetsAtualizados,tweetAtivo :{}})
      })
  }

  adicionaTweet = (e) => {
    e.preventDefault()
    const novoTweet = this.state.novoTweet;
    if (novoTweet) {

      const token = localStorage.getItem('token');

      fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${token}`, {
          method: 'POST',
          body: JSON.stringify({conteudo: novoTweet})
        })
        .then(res => res.json())
        .then(novoTweetServer => this.setState({
          tweets: [
            novoTweetServer, ...this.state.tweets
          ],
          novoTweet: ''
        }))
    }
  }

  abreModalParaTweet = (idDoTweetQueVaiNoModal, e) => {
    
    const ignoraModal = e.target.closest('.ignoraModal')
    
    if(!ignoraModal){

      const tweetSelecionado = this
        .state
        .tweets
        .find((tweetAtual) => tweetAtual._id === idDoTweetQueVaiNoModal)
      this.setState({tweetAtivo: tweetSelecionado})

    }
  }

  fechaModal = (e) => {

   const isModal = e.target.classList.contains('modal')
   
   if(isModal){
     this.setState({
       tweetAtivo :{}
     })
   }
    console.log('teste fecha modal', e.target);
  }

  render() {
    return (
      <Fragment>
        <Cabecalho>
          <NavMenu usuario={"@rodrigomartins"}/>
        </Cabecalho>
        <div className="container">
          <Dashboard>
            <Widget>
              <form className="novoTweet" onSubmit={this.adicionaTweet}>
                <div className="novoTweet__editorArea">
                  <span
                    className={`novoTweet__status ${this.state.novoTweet.length > 140
                    ? 'novoTweet__status--invalido'
                    : ''}`}>{this.state.novoTweet.length}/140
                  </span>

                  <textarea
                    value={this.state.novoTweet}
                    onInput={(event) => this.setState({novoTweet: event.target.value})}
                    className="novoTweet__editor"
                    placeholder="O que está acontecendo?"></textarea>
                </div>

                <button
                  type="submit"
                  className="novoTweet__envia"
                  disabled={this.state.novoTweet.length > 140
                  ? true
                  : false}>Tweetar
                </button>

              </form>
            </Widget>
            <Widget>
              <TrendsArea/>
            </Widget>
          </Dashboard>
          <Dashboard posicao="centro">
            <div
              className={`${this.state.tweets.length === 0
              ? 'tweet__no-tweet'
              : 'has-tweet'}`}>
              <p>Digite um tweet ☺</p>
            </div>
            <Widget>
              <div className="tweetsArea">
                {this
                  .state
                  .tweets
                  .map((tweetInfo, i) =>
                   <Tweet 
                   key={tweetInfo._id} 
                   tweetInfo={tweetInfo} 
                   texto={tweetInfo.conteudo} 
                  //Passando função e parametro para o componente filho <Tweet />
                  removeHandler={() => {this.removeTweet(tweetInfo._id)}} 
                  handleModal={(e) => {this.abreModalParaTweet(tweetInfo._id, e)}}
                  />)
                }
              </div>
            </Widget>
          </Dashboard>

        </div>
        {
        this.state.tweetAtivo._id && 
        
          <Modal isAberto={this.state.tweetAtivo._id} fechaModal={this.fechaModal}>
            <Widget>
              <Tweet
                removeHandler={() => {this.removeTweet(this.state.tweetAtivo._id)}}
                texto={this.state.tweetAtivo.conteudo}
                tweetInfo={this.state.tweetAtivo} />
            </Widget>
          </Modal>
        }
      </Fragment>
    );
  }
}

export default Home;
