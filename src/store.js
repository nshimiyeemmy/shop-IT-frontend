

//contains the codes to connect to the extension {react-redux}
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productsReducers,
  productDetailsReducer,
  newReviewReducer
} from './reducers/productReducers';
import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
} from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducer';
import { newOrderReducer, myOrdersReducer,OrderDetailsReducer } from './reducers/orderReducers';
//creating reducers for every resource such as users, products
const reducer = combineReducers({

  products: productsReducers,
  productDetails: productDetailsReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails:OrderDetailsReducer,
  newReview:newReviewReducer
});
//this inital state contains all the data that we want to put in the state just before loading the application
let initialState = {

  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingInfo: localStorage.getItem('shippingInfo')
      ? JSON.parse(localStorage.getItem('shippingInfo'))
      : {},
  },
};

//contains all the middleware that we want to use
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
