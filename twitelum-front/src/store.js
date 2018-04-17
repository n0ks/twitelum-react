import {createStore} from 'redux'

function tweetReducer(state = [], action = {}) {
  console.log(action);

  if (action.type === 'CARREGA_TWEETS') 
    return action.tweets

  return state
}

const store = createStore(tweetReducer);

export default store