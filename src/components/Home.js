import React, { Fragment, useEffect } from 'react'
import MetaData from './layouts/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import {getProducts} from '../actions/productActions'
const Home = () => {
 
  const dispatch = useDispatch();
  //fetching data from the state
 const {products,loading, error, productsCount} = useSelector(state =>state.products)

console.log(products,productsCount)

  //useEffect is the hook that is going to run this component basically routes, it is the first thing to run when this component loads
  //It's much like a constructor of the class
  useEffect(() => {
//so inside here we have to call our function
   dispatch(getProducts());
   
  },[dispatch])


    return (
        <Fragment >
          <MetaData title={'Buy best products online'}/>

        <h1 id="products_heading">Latest Products</h1>

    <section id="products" className="container mt-5">
      <div className="row">
        {products && products.map(product => (

          <div key={product._id} className="col-sm-12 col-md-6 col-lg-3 my-3">
          <div className="card p-3 rounded">
            <img
              className="card-img-top mx-auto"
              src="https://m.media-amazon.com/images/I/61B04f0ALWL._AC_UY218_.jpg"
            />
            <div className="card-body d-flex flex-column">
             <h5 className="card-title">
                <a href="">{product.name}</a>
              </h5>
              </div>
              <div className="ratings mt-auto">
               <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star-half-o"></i>
                <i className="fa fa-star-o"></i>
                <span id="no_of_reviews">(5 Reviews)</span>
              </div>
              <p className="card-text">$965.67</p>
              <a href="#" id="view_btn" className="btn btn-block">View Details</a>
            </div>
          </div>

        ))}
       </div>
    </section>
            
        </Fragment>
    )
}

export default Home
