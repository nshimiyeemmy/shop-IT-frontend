import React, { Fragment,useState ,useEffect } from 'react'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';
import MetaData from './layouts/MetaData'
import Product from './product/Product'
import Loader from './layouts/Loader'
import { useDispatch, useSelector } from 'react-redux'
import {useAlert} from 'react-alert'
import {getProducts} from '../actions/productActions'

//finding the price range - create range  {min price   & max price}
const {createSliderWithTooltip} = Slider;
const Range = createSliderWithTooltip(Slider.Range)

const Home = ({match}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1,1000])
  const dispatch = useDispatch();
  const alert = useAlert();

  //fetching data from the state
 const {products,loading, error, productsCount, resPerPage} = useSelector(state =>state.products)

 const keyword = match.params.keyword;

 //useEffect is the hook that is going to run this component basically routes, it is the first thing to run when this component loads
  //It's much like a constructor of the class
  useEffect(() => {
//so inside here we have to call our function
if(error){
    return alert.error(error)
    }
    dispatch(getProducts(keyword,currentPage,price));

  },[dispatch, alert, error, keyword, currentPage,price])

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

     {keyword ? (

         <Fragment>
            <div className="col-6 col-md-3 mt-5 mb-5">
                <div className="px-5">
                    <Range
                     marks={{
                         1:`$1`,
                         1000:`1000`
                     }}
                     min={1}
                     max={1000}
                     defaultValue={[1,1000]}
                     tipFormatter={value=>`$${value}`}
                     tipProps={{
                         diplacement: "top",
                         visible:true
                     }}
                     value={price}
                     onChange={price => setPrice(price)}
                    />
                </div>
            </div>

            <div className="col-6 col-md-9">
            <div className="row">
                {
                    products && products.map(product => (
                        <Product key={product._id} product={product} col={4}/>
                        ))
                }
            </div>
            </div>
         </Fragment>

     ):(
        products && products.map(product => (
            <Product key={product._id} product={product} col={3}/>
            ))
     )}
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
