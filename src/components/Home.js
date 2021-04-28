import React, { Fragment, useEffect } from 'react'
import MetaData from './layouts/MetaData'
import Product from './product/Product'
import Loader from './layouts/Loader'
import { useDispatch, useSelector } from 'react-redux'
import {useAlert} from 'react-alert'
import {getProducts} from '../actions/productActions'
const Home = () => {

  const dispatch = useDispatch();
  const alert = useAlert();

  //fetching data from the state
 const {products,loading, error, productsCount} = useSelector(state =>state.products)
  //useEffect is the hook that is going to run this component basically routes, it is the first thing to run when this component loads
  //It's much like a constructor of the class
  useEffect(() => {
//so inside here we have to call our function
if(error){
    return alert.error(error)
    }
    dispatch(getProducts());
  },[dispatch, alert, error])
    return (
      <Fragment>
        {loading ? <Loader/>:(
           <Fragment >
           <MetaData title={'Buy best products online'}/>

         <h1 id="products_heading">Latest Products</h1>
     <section id="products" className="container mt-5">
       <div className="row">
         {products && products.map(product => (
         <Product key={product._id} product={product}/>
         ))}
        </div>
     </section>

         </Fragment>
        )}
      </Fragment>
    )
}
export default Home
