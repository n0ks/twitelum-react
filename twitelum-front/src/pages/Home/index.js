import React, {Component, Fragment} from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../containers/TweetPadrao'
import Modal from '../../components/Modal'
import PropTypes from 'prop-types'
import * as TweetsAPI from '../../apis/TweetsAPI'

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
    this.context.store.dispatch(TweetsAPI.carrega());
    console.log('Did Mount');
  }

 /*  removeTweet = (idDoTweet) => {
    this.context.store.dispatch(TweetsAPI.remove(idDoTweet))
    this.setState({tweetAtivo : {}})
  } */

  adicionaTweet = (e) => {

    e.preventDefault()
    const novoTweet = this.state.novoTweet;
    this
      .context
      .store
      .dispatch(TweetsAPI.adiciona(novoTweet));
    
    this.setState({novoTweet: ''})
  }


  abreModalParaTweet = (idDoTweetQueVaiNoModal, e) => {
    
    const ignoraModal = e.target.closest('.ignoraModal')
    
    if(!ignoraModal) {
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
