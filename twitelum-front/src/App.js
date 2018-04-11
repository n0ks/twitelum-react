import React, {Component, Fragment} from 'react';
import Cabecalho from './components/Cabecalho'
import NavMenu from './components/NavMenu'
import Dashboard from './components/Dashboard'
import Widget from './components/Widget'
import TrendsArea from './components/TrendsArea'
import Tweet from './components/Tweet'

class App extends Component {
  constructor() {
    super()
    this.state = {
      novoTweet: '',
      tweets: []
    }
    this.adicionaTweet = this
      .adicionaTweet
      .bind(this);
  }

  adicionaTweet(e) {
    const novoTweet = this.state.novoTweet;
    e.preventDefault()
    this.setState({
      tweets: [
        novoTweet, ...this.state.tweets
      ]
    })
    console.log('teste', this)

  }

  render() {
    return (
      <Fragment>
        <Cabecalho>
          <NavMenu usuario="@rodrigomartins"/>
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
            <div className={`${this.state.tweets.length === 0 ? 'tweet__no-tweet' : 'has-tweet' }`}>
              <p>Digite um tweet ☺</p>
            </div>
            <Widget>
              <div className="tweetsArea">
                {this
                  .state
                  .tweets
                  .map((tweet, i) => {
                    console.table(i, tweet);
                    return <Tweet key={tweet + i} texto={tweet}/>
                  })}
              </div>
            </Widget>
          </Dashboard>
        </div>
      </Fragment>
    );
  }
}

export default App;
