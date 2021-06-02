import { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Home from './components/Home';
import productDetails from './components/product/ProductDetails';

import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';

import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import { loadUser } from './actions/userActions';
import store from './store';
import ProtectedRoute from './components/route/ProtectedRoute';
import updateProfile from './components/user/UpdatedProfile';
import updatePassword from './components/user/UpdatePassword';
import forgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/NewPassword';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
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
          <ProtectedRoute path="/shipping" component={Shipping} exact />

          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <ProtectedRoute path="/me" component={Profile} exact />
          <ProtectedRoute path="/me/update" component={updateProfile} exact />
          <ProtectedRoute
            path="/password/update"
            component={updatePassword}
            exact
          />
          <Route path="/password/forgot" component={forgotPassword} exact />
          <Route
            path="/password/reset/:token"
            component={ResetPassword}
            exact
          />
        </div>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
