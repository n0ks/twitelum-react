import React, {Component, Fragment} from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'

class Home extends Component {
  constructor(props) {
    console.log("Home Props", props);
    super();

    this.state = {
      novoTweet: '',
      tweets: []
    }
    


  }

  componentDidMount(){
    fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('token')}`)
    .then(res => res.json())
    .then(tweetServer => this.setState({tweets: tweetServer}));
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
                  .map((tweetInfo, i) => <Tweet key={tweetInfo._id} tweetInfo={tweetInfo} texto={tweetInfo.conteudo}/>)}
              </div>
            </Widget>
          </Dashboard>

        </div>
      </Fragment>
    );
  }
}

export default Home;
