//contains the codes to connect to the extension {react-redux}

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productsReducers,
  productDetailsReducer,
} from './reducers/productReducers';
import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
} from './reducers/userReducers';
//creating reducers for every resource such as users, products
const reducer = combineReducers({
  products: productsReducers,
  productDetails: productDetailsReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
});
//this inital state contains all the data that we want to put in the state just before loading the application
let initialState = {};

//contains all the middleware that we want to use
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
