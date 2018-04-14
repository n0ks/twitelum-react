import React, {Component} from 'react'
import './tweet.css'
import PropTypes from 'prop-types'

class Tweet extends Component {
  constructor(props) {
    super()

    this.state = {
      likeado: props.tweetInfo.likeado,
      totalLikes: props.tweetInfo.totalLikes
    }
  }

  handleLike = (ID) => {  
    console.log('botao like');
    console.log(ID);
    const {likeado, totalLikes} = this.state;

    this.setState({
      likeado: !likeado,
      totalLikes: likeado
        ? totalLikes - 1
        : totalLikes + 1
    })
    fetch(`http://localhost:3001/tweets/${ID}/like/?X-AUTH-TOKEN=${localStorage.getItem('token')}`, {method: 'POST'})
      .then(res => res.json())
      .then(res => console.log(res));
  }

  render() {
    return (
      <article className="tweet" onClick={this.props.handleModal}>
        <div className="tweet__cabecalho">
          <img
            className="tweet__fotoUsuario"
            src={this.props.tweetInfo.usuario.foto}
            alt=""/>
          <span className="tweet__nomeUsuario">{this.props.tweetInfo.usuario.nome}</span>
          <a href="">
            <span className="tweet__userName">@{this.props.tweetInfo.usuario.login}</span>
          </a>
        </div>
        <p className="tweet__conteudo">{this.props.texto}</p>
        <footer className="tweet__footer">
          <button
            className="btnTweet btn btn--clean"
            onClick={(e) => {this.handleLike(this.props.tweetInfo._id)}}>
            <svg
              className={`icon icon--small iconHeart ${this.state.likeado
              ? 'iconHeart--active'
              : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 47.5 47.5">
              <defs>
                <clipPath id="a">
                  <path d="M0 38h38V0H0v38z"></path>
                </clipPath>
              </defs>
              <g clipPath="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
                <path
                  d="M36.885 25.166c0 5.45-4.418 9.868-9.867 9.868-3.308 0-6.227-1.632-8.018-4.128-1.79 2.496-4.71 4.129-8.017 4.129-5.45 0-9.868-4.418-9.868-9.868 0-.773.098-1.52.266-2.242C2.75 14.413 12.216 5.431 19 2.965c6.783 2.466 16.249 11.448 17.617 19.96.17.721.268 1.47.268 2.241"></path>
              </g>
            </svg>
            {this.state.totalLikes}
          </button >
            {
              this.props.tweetInfo.removivel &&
              <button 
              className="btn btn--blue btn--remove"
              //Recebendo função do componente <Home />
              onClick={this.props.removeHandler}
              >X</button>
            }
        </footer>
      </article>
    )
  }
}

// Tweet.propTypes = {
//   removeHandler : PropTypes.func.isRequired,
//   texto: PropTypes.string.isRequired,

//   tweetInfo: PropTypes.shape({

//     _id: PropTypes.string.isRequired,
//     likeado: PropTypes.bool.isRequired,
//     totalLikes: PropTypes.number.isRequired,
//     removivel: PropTypes.bool,

//     usuario: PropTypes.shape({

//       foto: PropTypes.string.isRequired,
//       login: PropTypes.string.isRequired,
//       nome: PropTypes.string.isRequired

//     }).isRequired
//   }).isRequired
// }
export default Tweet