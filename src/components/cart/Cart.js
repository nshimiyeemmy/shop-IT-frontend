import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { getProductDetails, clearErrors } from '../../actions/productActions';
import { addItemToCart } from '../../actions/cartActions';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  //function to increase the Quantity for products
  const increaseQuantity = (id,cartQuantity,quantity) => {
    const newQuantity = cartQuantity + 1;
    if (newQuantity  > quantity) return;
    dispatch(addItemToCart(id,newQuantity))
  };
  //function to increase the Quantity for products
  const decreaseQuantity = (id,cartQuantity) => {
    const newQuantity = cartQuantity - 1;
    if (newQuantity  <= 0) return;
    dispatch(addItemToCart(id,newQuantity))
  };
  return (
    <Fragment>
        <MetaData title={"Your Cart"}/>
      {cartItems.length === 0 ? (
        <h2 className="mt-5">You Cart is empty</h2>
      ) : (
        <Fragment>
 <h2 className="mt-5">Your Cart: <b>{cartItems.length}</b></h2>

        <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
        {cartItems.map(item =>(
            <Fragment>
                   <hr />
                   <div className="cart-item">
                    <div className="row">
                        <div className="col-4 col-lg-3">
                            <img src={item.image} alt="Laptop" height="90" width="115"/>
                        </div>

                        <div className="col-5 col-lg-3">
                            <Link to={`/products/${item.product}`}>{item.name}</Link>
                        </div>


                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                            <p id="card_item_price">${item.price}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={()=>decreaseQuantity(item.product,item.cartQuantity)}>-</span>
                                <input type="number" className="form-control count d-inline" value={item.cartQuantity} readOnly />

								<span className="btn btn-primary plus"onClick={()=>increaseQuantity(item.product,item.cartQuantity,item.quantity)}>+</span>
                            </div>
                        </div>

                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                            <i id="delete_cart_item" className="fa fa-trash btn btn-danger"></i>
                        </div>

                    </div>
                </div>
                <hr />

            </Fragment>
        ))}
            </div>

            <div className="col-12 col-lg-3 my-4">
                <div id="order_summary">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Subtotal:  <span className="order-summary-values">3 (Units)</span></p>
                    <p>Est. total: <span className="order-summary-values">$765.56</span></p>

                    <hr />
                    <button id="checkout_btn" className="btn btn-primary btn-block">Check out</button>
                </div>
            </div>
        </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
