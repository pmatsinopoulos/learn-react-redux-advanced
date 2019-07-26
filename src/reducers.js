import {
  REQUEST_POSTS,
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  RECEIVE_POSTS,
  initialState
} from "./actions";
import {combineReducers} from "redux";

const selectedSubreddit = (state = 'reactjs', action) => {
  switch(action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit
    default:
      return state
  }
}

const posts = (state = initialState, action) => {
  switch(action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {didInvalidate: true})
    case REQUEST_POSTS:
      return Object.assign({}, state, {isFetching: true, didInvalidate: false})
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        lastUpdated: action.receivedAt,
        items: action.posts.map(post => {
          let {id, title} = post
          return {id, title}
        })
      })
    default:
      return state
  }
}

const postsBySubreddit = (state = {}, action) => {
  switch(action.type) {
    case INVALIDATE_SUBREDDIT:
    case REQUEST_POSTS:
    case RECEIVE_POSTS:
      return Object.assign({}, state, {[action.subreddit]: posts(state[action.subreddit], action)})
    default:
      return state
  }
}

const rootReducer = combineReducers({
  selectedSubreddit,
  postsBySubreddit
})

export default rootReducer