export const carrega = () => {
  return (dispatch) => {
    fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('token')}`)
      .then(res => res.json())
      .then(tweetsDoServidor => {
        dispatch({type: 'CARREGA_TWEETS', tweets: tweetsDoServidor})
      });
    console.log('hello');

  }
}

// NovoTweet vem da Home com o dispatch na função adicionaTweet()
export const adiciona = (novoTweet) => {

  return (dispatch) => {
    if (novoTweet) {
      const token = localStorage.getItem('token');

      fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${token}`, {
          method: 'POST',
          body: JSON.stringify({conteudo: novoTweet})
        })
        .then(res => res.json())
        .then(novoTweetServer => {
          dispatch({type: 'ADICIONA_TWEET', tweet: novoTweetServer})
        })
    }
  }
}

export const remove = (idDoTweet) => {
  return (dispatch) => {

    fetch(`http://localhost:3001/tweets/${idDoTweet}?X-AUTH-TOKEN=${localStorage.getItem('token')}`, {method: 'DELETE'})
      .then(res => res.json())
      .then(res => {
        dispatch({type: 'REMOVE_TWEET', idDoTweet: idDoTweet})

      })
  }
}