import fetch from 'cross-fetch'

export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const selectSubreddit = subreddit => ({
  type: SELECT_SUBREDDIT,
  subreddit
})

export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'
export const invalidateSubreddit = subreddit => ({
  type: INVALIDATE_SUBREDDIT,
  subreddit
})

// Actions for network interaction
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const requestPosts = subreddit => ({
  type: REQUEST_POSTS,
  subreddit
})

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const receivePosts = (subreddit, json) => ({
  type: RECEIVE_POSTS,
  subreddit,
  posts: json.data.children.map(child => child.data),
  receivedAt: Date.now()
})

const fetchPosts = subreddit => {
  return dispatch => {
    dispatch(requestPosts(subreddit))
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json(), error => console.error('An error occurred', error))
      .then(json => {
        console.log('json', json)
        dispatch(receivePosts(subreddit, json))
      })
  }
}

const shouldFetchPosts = (state, subreddit) => {
  const posts = state.postsBySubreddit[subreddit] || initialState
  console.debug('inside shouldFetchPosts posts', posts)
  if (posts.items.length === 0) {
    console.debug('shouldFetchPosts returns true')
    return true
  }
  else if (posts.isFetching) {
    console.debug('shouldFetchPosts returns false - "posts.isFetching" being true')
    return false
  }
  else {
    console.debug(`shouldFetchPosts returns ${posts.didInvalidate} from posts.didInvalidate`)
    return posts.didInvalidate
  }
}

export const fetchPostsIfNeeded = subreddit => {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      console.debug('should fetch posts')
      return dispatch(fetchPosts(subreddit))
    }
    else {
      console.debug('should not fetch posts')
      return Promise.resolve()
    }
  }
}

export const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: []
}