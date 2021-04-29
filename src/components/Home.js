import React, { Fragment,useState ,useEffect } from 'react'
import Pagination from 'react-js-pagination'
import MetaData from './layouts/MetaData'
import Product from './product/Product'
import Loader from './layouts/Loader'
import { useDispatch, useSelector } from 'react-redux'
import {useAlert} from 'react-alert'
import {getProducts} from '../actions/productActions'
const Home = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const alert = useAlert();

  //fetching data from the state
 const {products,loading, error, productsCount, resPerPage} = useSelector(state =>state.products)
  //useEffect is the hook that is going to run this component basically routes, it is the first thing to run when this component loads
  //It's much like a constructor of the class
  useEffect(() => {
//so inside here we have to call our function
if(error){
    return alert.error(error)
    }
    dispatch(getProducts(currentPage));

  },[dispatch, alert, error, currentPage])

  function setCurrentPageNo(pageNumber) {
      setCurrentPage(pageNumber)
  }
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

     {resPerPage <= productsCount && (
        <div className="d-flex justify-content-center mt-5">
    <Pagination
    activePage={currentPage}
    itemsCountPerPage={resPerPage}
    totalItemsCount={productsCount}
    onChange={setCurrentPageNo}
    nextPageText={`Next`}
    prevPageText={`Prev`}
    firstPageText={`First`}
    lastPageText={`Last`}
    itemClass="page-item"
    linkClass="page-link"
    />
</div>
 )}

         </Fragment>
        )}
      </Fragment>
    )
}
export default Home
