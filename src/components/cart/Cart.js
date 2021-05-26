import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { addItemToCart, removeItemFromCart } from '../../actions/cartActions';

const Cart = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { cartItems } = useSelector((state) => state.cart);
  //function to increase the Quantity for products
  const increaseQuantity = (id, cartQuantity, quantity) => {
    const newQuantity = cartQuantity + 1;
    if (newQuantity > quantity) return;
    dispatch(addItemToCart(id, newQuantity));
  };
  //function to increase the Quantity for products
  const decreaseQuantity = (id, cartQuantity) => {
    const newQuantity = cartQuantity - 1;
    if (newQuantity <= 0) return;
    dispatch(addItemToCart(id, newQuantity));
  };
  // remove item from cart Handler function
  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
    alert.success('Item removed from cart successfully!');
  };
  return (
    <Fragment>
      <MetaData title={'Your Cart'} />
      {cartItems.length === 0 ? (
          <div>
        <h2 className="mt-5 text-center">You Cart Looks empty!</h2>
        <hr/>
        <h5 className="text-center">You have not purchased any product yet,<br/>Please try purchasing Products..</h5>
        </div>
      ) : (
        <Fragment>
          <h3 className="mt-5">
            You have added: <b>{cartItems.length}</b> Products to Cart
          </h3>
          <div className="row d-flex justify-content-between mb-0 mt-3">
            <div className="col-12 col-lg-8">
            <div className="row flex justify-content-between" id="head">
            <h5 className="pl-5">Image</h5>
            <h5 className="pl-5">Name</h5>
            <h5 className="pl-5" id="price">Price</h5>
            <h5 className="pl-5">Quantity</h5>
            <h5 className="pl-5">Delete</h5>
          </div>
              {cartItems.map((item) => (
                <Fragment>
                  <hr />
                  <div className="cart-item">
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img
                          src={item.image}
                          alt="Laptop"
                          height="90"
                          width="115"
                        />
                      </div>
                      <div className="col-5 col-lg-3">
                        <Link to={`/products/${item.product}`}>
                          {item.name}
                        </Link>
                      </div>
                      <div className="col-4 col-lg-2 mt-4 mt-lg-1">
                        <Link id="card_item_price">${item.price}</Link>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span
                            className="btn btn-danger minus"
                            onClick={() =>
                              decreaseQuantity(item.product, item.cartQuantity)
                            }
                          >
                            -
                          </span>
                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={item.cartQuantity}
                            readOnly
                          />

                          <span
                            className="btn btn-primary plus"
                            onClick={() =>
                              increaseQuantity(
                                item.product,
                                item.cartQuantity,
                                item.quantity
                              )
                            }
                          >
                            +
                          </span>
                        </div>
                      </div>

                      <div className="col-4 col-lg-1 mt-4 mt-lg-1">
                        <i
                          id="delete_cart_item"
                          className="fa fa-trash btn btn-danger"
                          onClick={() => removeCartItemHandler(item.product)}
                        ></i>
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
                <p>
                  Subtotal:{' '}
                  <span className="order-summary-values">3 (Units)</span>
                </p>
                <p>
                  Est. total:{' '}
                  <span className="order-summary-values">$765.56</span>
                </p>

                <hr />
                <button id="checkout_btn" className="btn btn-primary btn-block">
                  Check out
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
