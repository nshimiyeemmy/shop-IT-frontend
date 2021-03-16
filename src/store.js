//contains the codes to connect to the extension {react-redux}

import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productsReducers} from './reducers/productReducers'
//creating reducers for every resource such as users, products
const reducer = combineReducers({
 products:productsReducers
})
//this inital state contains all the data that we want to put in the state just before loading the application
let initialState = {}

//contains all the middleware that we want to use
const middleware = [thunk]
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store