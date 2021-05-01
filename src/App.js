import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'
import Home from './components/Home'
import productDetails from './components/product/ProductDetails'
import Login from './components/user/Login'
function App() {
  return (
    <Router>
    <div className="App">
     <Header/>
     <div className="container container-fluid home">
     <Route path="/" component={Home} exact/>
     <Route path="/search/:keyword" component={Home}/>
     <Route path="/login" component={Login} exact/>
     <Route path="/product/:id" component={productDetails} exact/>
     </div>
     <Footer/>
    </div>
    </Router>
  )
}

export default App;
