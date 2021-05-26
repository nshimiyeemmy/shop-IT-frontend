import React, { Fragment, useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import Loader from '../layouts/Loader';
import MetaData from '../layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { getProductDetails, clearErrors } from '../../actions/productActions';
import { addItemToCart } from '../../actions/cartActions';
const ProductDetails = ({ match }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  useEffect(() => {
    dispatch(getProductDetails(match.params.id));
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, match.params.id]);
  //function to increase the Quantity for products
  const increaseQuantity = () => {
    const count = document.querySelector('.count');
    if (count.valueAsNumber >= product.quantity) return;
    const Qty = count.valueAsNumber + 1;
    setQuantity(Qty);
  };
  //function to increase the Quantity for products
  const decreaseQuantity = () => {
    const count = document.querySelector('.count');
    if (count.valueAsNumber <= 1) return;
    const Qty = count.valueAsNumber - 1;
    setQuantity(Qty);
  };
  //function to add the products to Cart with
  const addToCart = () => {
    dispatch(addItemToCart(match.params.id, quantity));
    alert.success('Item added to Cart successfully!');
  };
  return (
    <Fragment>
      <MetaData title={product.name} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
              <Carousel pause="hover">
                {product.images &&
                  product.images.map((image) => (
                    <Carousel.Item key={image.public_id}>
                      <img
                        src={image.url}
                        className="d-block w-100"
                        alt={product.title}
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>

            <div className="col-12 col-lg-5 mt-5">
              <h3>{product?.name}</h3>
              <p id="product_id">Product # {product._id}</p>
              <hr />
              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{
                    width: `${(product.ratings / 5) * 100}%`,
                  }}
                ></div>
              </div>
              <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
              <hr />
              <p id="product_price">${product.price}</p>
              <div className="stockCounter d-inline">
                <span
                  className="btn btn-danger minus"
                  onClick={decreaseQuantity}
                >
                  -
                </span>
                {product.quantity == 0 ? (
                  <input
                    type="number"
                    className="form-control count d-inline"
                    value="0"
                    readOnly
                  />
                ) : (
                  <input
                    type="number"
                    className="form-control count d-inline"
                    value={quantity}
                    readOnly
                  />
                )}
                <span
                  className="btn btn-primary plus"
                  onClick={increaseQuantity}
                >
                  +
                </span>
              </div>
              <button
                type="button"
                id="cart_btn"
                className="btn btn-primary d-inline ml-4"
                disabled={product.quantity === 0}
                onClick={addToCart}
              >
                Add to Cart
              </button>
              <hr />
              <p>
                Status:{' '}
                <span
                  id="stock_status"
                  className={product.quantity > 0 ? `greenColor` : `redColor`}
                >
                  {product.quantity > 0 ? `Available In Stock` : `Out of Stock`}
                </span>
              </p>
              <hr />
              <h4 className="mt-2">Description:</h4>
              <p>{product.description}</p>
              <hr />
              <p id="product_seller mb-3">
                Manufactured by: <strong>{product.manufacturer}</strong>
              </p>
              <button
                id="review_btn"
                type="button"
                className="btn btn-primary mt-4"
                data-toggle="modal"
                data-target="#ratingModal"
              >
                Submit Your Review
              </button>
              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  <div
                    className="modal fade"
                    id="ratingModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="ratingModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="ratingModalLabel">
                            Submit Review
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <ul className="stars">
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                          </ul>

                          <textarea
                            name="review"
                            id="review"
                            className="form-control mt-3"
                          ></textarea>

                          <button
                            className="btn my-3 float-right review-btn px-4 text-white"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default ProductDetails;
