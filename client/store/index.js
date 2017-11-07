import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'

// addtions to boilerplate below
import products from './product'
import order from './order'
import review from './review'

const reducer = combineReducers({
  user,
  products,
  order,
  review
})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './product'  // have to export
export * from './order'
export * from './review'
export * from './auth';


