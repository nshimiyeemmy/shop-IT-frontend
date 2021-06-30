import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import MetaData from '../layouts/MetaData';
import Loader from '../layouts/Loader';
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { getAdminProducts, clearErrors} from '../../actions/productActions';
const ProductList = ({history}) => {
    const alert = useAlert();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAdminProducts());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: 'Product ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Price',
          field: 'price',
          sort: 'asc',
        },
        {
          label: 'Quantity',
          field: 'quantity',
          sort: 'asc',
        },
        {
            label: 'Actions',
            field: 'actions',
          },
      ],
      rows: [],
    };
    // let arrayOrders = [];
    // if (orders.Order) arrayOrders.push(...orders.Order);
    products.map((Product) => {
      data.rows.push({
        id: Product._id,
        name: Product.name,
        price: `$${Product.price}`,
        quantity: Product.quantity,
        actions:<Fragment>
          <Link to={`/admin/product/${Product._id}`} className="btn btn-primary py-1 px-2">
            <i className="fa fa-pencil"></i>
          </Link>
          <button className="btn btn-danger py-1 px-2">
              <i className="fa fa-trash"></i>
          </button>
           </Fragment>
      });
    });
    return data;
  };
    return (
        <Fragment>
             <MetaData title="All Products"/>
       <div className="row">
      <div className="col-12 col-md-2" style={{ marginTop: '-420px', marginBottom: '345px' }}>
          <Sidebar />
      </div>
      <div className="col-12 col-md-10" style={{ marginTop: '-420px', marginBottom: '420px' }}>
          <Fragment>
              <h1 className="my-5">All Products</h1>
              {loading ? <Loader /> :(
               <MDBDataTable
               data={setProducts()}
               className="px-3"
               bordered
               striped
               hover
             />
              )
            }
          </Fragment>

      </div>
       </div>
        </Fragment>
    )
}

export default ProductList
