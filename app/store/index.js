import { createStore, applyMiddleware, combineReducers } from 'redux'
import trader, {genesis, terminator} from 'redux-async-promise'
import * as reducer from './reducers'
import logger from 'redux-logger'

const combinedReducers = combineReducers({
  ...reducer
})

const middlewares = [genesis, trader, terminator]
let finalCreateStore

if (__DEBUG__) {
  finalCreateStore = applyMiddleware(...middlewares, logger())(createStore)
} else {
  finalCreateStore = applyMiddleware(...middlewares)(createStore)
}

const store = finalCreateStore(combinedReducers)

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers')
    store.replaceReducer(nextRootReducer)
  })
}

export default store
