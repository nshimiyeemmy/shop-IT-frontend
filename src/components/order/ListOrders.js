import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import MetaData from '../layouts/MetaData';
import Loader from '../layouts/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { myOrders, clearErrors } from '../../actions/orderActions';

const ListOrders = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(myOrders());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: 'Order ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Number of Items',
          field: 'numOfItems',
          sort: 'asc',
        },
        {
          label: 'Amount',
          field: 'amount',
          sort: 'asc',
        },
        {
          label: 'Status',
          field: 'status',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
          sort: 'asc',
        },
      ],
      rows: [],
    };

    let arrayOrders = [];
    if (orders.Order) arrayOrders.push(...orders.Order);
    arrayOrders.map((Order) => {
      console.log({ Order });
      data.rows.push({
        id: Order._id,
        numOfItems: Order.orderItems.length,
        amount: `$${Order.totalPrice}`,
        status:
          Order.orderStatus &&
          String(Order.orderStatus).includes('Delivered') ? (
            <p style={{ color: 'green' }}>{Order.orderStatus}</p>
          ) : (
            <p style={{ color: 'red' }}>{Order.orderStatus}</p>
          ),
        actions: (
          <Link to={`/order/${Order._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
        ),
      });
    });
    return data;
  };

  return (
    <Fragment>
      <MetaData title={'My Orders'} />
      <h1 className="my-5">My Orders</h1>
      {loading ? (
        <Loader />
      ) : (
        <MDBDataTable
          data={setOrders()}
          className="px-3"
          bordered
          striped
          hover
        />
      )}
    </Fragment>
  );
};
export default ListOrders;
