import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Home from './components/Home';
import productDetails from './components/product/ProductDetails';

import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess';

import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import { loadUser } from './actions/userActions';

import ProtectedRoute from './components/route/ProtectedRoute';
import updateProfile from './components/user/UpdatedProfile';
import updatePassword from './components/user/UpdatePassword';
import forgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/NewPassword';

import OrderDetails from './components/order/OrderDetails';
import ListOrders from './components/order/ListOrders';

import store from './store';
import axios from 'axios';

//stripe payment frontend required parameters
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

function App() {
  const [StripeApiKey, setStripeApiKey] = useState('');
  useEffect(() => {
    store.dispatch(loadUser());
    async function getStripeApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');
      setStripeApiKey(data.StripeApiKey);
    }
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid home">
          <Route path="/" component={Home} exact />
          <Route path="/search/:keyword" component={Home} />
          <Route path="/product/:id" component={productDetails} exact />

          <Route path="/cart" component={Cart} exact />
          <ProtectedRoute path="/shipping" component={Shipping} />
          <ProtectedRoute path="/order/confirm" component={ConfirmOrder} />
          {StripeApiKey && (
            <Elements stripe={loadStripe(StripeApiKey)}>
              <ProtectedRoute path="/payment" component={Payment} />
            </Elements>
          )}

          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <ProtectedRoute path="/me" component={Profile} exact />
          <ProtectedRoute path="/me/update" component={updateProfile} exact />
          <ProtectedRoute
            path="/password/update"
            component={updatePassword}
            exact
          />
          <ProtectedRoute path="/success" component={OrderSuccess} exact />

          <Route path="/password/forgot" component={forgotPassword} exact />
          <Route
            path="/password/reset/:token"
            component={ResetPassword}
            exact
          />
          <ProtectedRoute path="/orders/me" component={ListOrders} exact />
          <ProtectedRoute path="/order/:id" component={OrderDetails} exact />
        </div>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
