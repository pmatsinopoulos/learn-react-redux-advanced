import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { selectSubreddit, fetchPostsIfNeeded } from "./actions"
import rootReducer from "./reducers"
import App from './components/App.jsx'

const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // let us dispatch() functions
    loggerMiddleware // neat middlware that logs actions
  )
)

store.dispatch(selectSubreddit('reactjs'))
store.dispatch(fetchPostsIfNeeded('reactjs')).then(() => console.log(store.getState()))



ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'))