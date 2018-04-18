import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

function tweetReducer(state ={lista:[], tweetAtivo: {}}, action = {}) {

  if (action.type === 'CARREGA_TWEETS') {
    // action.tweets vem do dispatch dentro de TweetsAPI na função carrega()
    const novoEstado = action.tweets;

    return novoEstado;
  }

  if (action.type === 'ADICIONA_TWEET') {

    console.warn('Ação que esta acontecendo:', action.type, state);
    const novoEstado = [
      // action.tweet vem do dispatch dentro de TweetsAPI na função adiciona()
      action.tweet,
      ...state
    ]
    return novoEstado;
  }

  if (action.type === 'REMOVE_TWEET') {
    
    console.warn('Ação que esta acontecendo:', action.type, state);
    const updated = state.filter(tweet => tweet._id !== action.idDoTweet);

    return updated;
  }
  return state
}

const store = createStore(tweetReducer, applyMiddleware(thunk));

export default store