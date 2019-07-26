import React from 'react'
import { connect } from 'react-redux'
import {fetchPostsIfNeeded, selectSubreddit} from "../actions";

const SelectSubreddit = ({dispatch}) => {
  let input
  return (
    <div>
      <h1>Select Subreddit by typing its name and clicking on fetch button</h1>
      <form
        onClick={(e) => {
          e.preventDefault()
          console.debug('form submitted')
          if (input.value.trim() === '') {
            return console.debug('nothing given')
          }

          console.debug('something given', input.value)
          let subreddit = input.value.trim()
          dispatch(selectSubreddit(subreddit))
          dispatch(fetchPostsIfNeeded(subreddit))

          input.value = ''
        }}
      >
          <input placeholder="type in the subreddit" ref={node => (input = node)}/>
          <button type="submit">Fetch</button>
      </form>
    </div>
  )
}

export default connect()(SelectSubreddit)