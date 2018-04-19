import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'

function tweetReducer(state = {
  lista: [],
  tweetAtivo: {}
}, action = {}) {

  if (action.type === 'CARREGA_TWEETS') {
    // action.tweets vem do dispatch dentro de TweetsAPI na função carrega()
    const novoEstado = {
      ...state,
      lista: action.tweets
    }
    return novoEstado;
  }

  if (action.type === 'ADICIONA_TWEET') {

    console.warn('Ação que esta acontecendo:', action.type, state);
    const novoEstado = {
      // action.tweet vem do dispatch dentro de TweetsAPI na função adiciona()
      ...state,
      lista: [
        action.tweet, ...state.lista
      ]
    }
    return novoEstado;
  }

  if (action.type === 'REMOVE_TWEET') {

    console.warn('Ação que esta acontecendo:', action.type, state);

    const listaDeTweets = state
      .lista
      .filter(tweet => tweet._id !== action.idDoTweet);

    const novoEstado = {
      ...state,
      lista: listaDeTweets,
      tweetAtivo: {}
    }

    return novoEstado;
  }

  if (action.type === 'ADD_TWEET_ATIVO') {
    const tweetAtivo = state
      .lista
      .find((tweetAtual) => tweetAtual._id === action.idDoTweetQueVaiNoModal)

    const novoEstado = {
      ...state,
      tweetAtivo: tweetAtivo
    }
    return novoEstado

  }

  if (action.type === 'REMOVE_TWEET_ATIVO') {

    return {
      ...state,
      tweetAtivo: {}
    }
  }
  if (action.type === 'LIKE') {
    const tweetsAtualizados = state
      .lista
      .map(tweetAtual => {
        if (tweetAtual._id === action.idDoTweet) {

          const {likeado, totalLikes} = tweetAtual;

          tweetAtual.likeado = !likeado;

          tweetAtual.totalLikes = likeado
            ? totalLikes - 1
            : totalLikes + 1

        }
        return tweetAtual
      })

    console.warn('Likeado', tweetsAtualizados);
    const tweetAtivoAtualizado = state
      .lista
      .find(tweetAtual => tweetAtual._id === action.idDoTweet)

    return {
      ...state
      /*       lista: tweetsAtualizados,
      tweetAtivo: ...tweetAtivoAtualizado */
    }

  }
  return state
}
function notificacoesReducer(state = '', action = {}) {
  if (action.type === 'ADD_NOTIFICACAO') {
    const novoEstado = action.msg;
    return novoEstado;

  }
  if (action.type === 'REMOVE_NOTIFICACAO') {
    return ''
  }
  return state
}

const store = createStore(combineReducers({tweets: tweetReducer, notificacao: notificacoesReducer}), applyMiddleware(thunk));

export default store