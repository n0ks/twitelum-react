import Tweet from '../components/Tweet'
import {connect} from 'react-redux'
import * as TweetsAPI from '../apis/TweetsAPI'

const mapDispatchToProps = (dispatch, propsRecebidas) => {

  return {
    removeHandler: () => {
      dispatch(TweetsAPI.remove(propsRecebidas.tweetInfo._id))
    },
    handleLike: () => {
      
      dispatch(TweetsAPI.like(propsRecebidas.tweetInfo._id))
    }
  }

}

const TweetPadraoContainer = connect(null, mapDispatchToProps)(Tweet)

export default TweetPadraoContainer;

//Connect sem ajuda da lib
/* class TweetPadrao extends Component{
  removeHandler(){store.dispatch(TweetAPI.remove())}
  render(){
    return(
      <Tweet removeHandler={removeHandler} />
    )
  }

} */