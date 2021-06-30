//this is where we will be sending the request to the backend to get products and sending data in the state

import axios from 'axios';
import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  PRODUCTS_DETAILS_REQUEST,
  PRODUCTS_DETAILS_SUCCESS,
  PRODUCTS_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_SUCCESS,
  ADMIN_PRODUCTS_FAIL,
  CLEAR_ERRORS,
} from '../constants/productConstants';

//Bellow is a function to get all products from backend
export const getProducts =
  (keyword = '', currentPage = 1, price, category, rating = 0) =>
  async (dispatch) => {
    try {
      /*firstly we will dispatch ALL_PRODUCTS_REQUEST and when we dispatch it, it's going to set loading to true,
     and set products to and empty array in the state*/
      dispatch({ type: ALL_PRODUCTS_REQUEST });
      //and then we send request to  get all products and save them in the data variable using url below

      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`;

      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`;
      }

      const { data } = await axios.get(link);
      //and after that we wil dispath all products success and we pass the data in the payload
      dispatch({
        type: ALL_PRODUCTS_SUCCESS,
        payload: {
          products: data.data,
          productsCount: data.productCount,
          resPerPage: data.resPerPage,
        },
      });
    } catch (error) {
      //but if there are some error we will dispatch all products fail and then in the payload we will store the error message
      dispatch({
        type: ALL_PRODUCTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
//Clear Erorrs using CLEAR_ERRORS constant
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
//Bellow is a function to get a product details from backend
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTS_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch({
      type: PRODUCTS_DETAILS_SUCCESS,
      payload: { product: data.data },
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCTS_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/products`);
    dispatch({
      type: ADMIN_PRODUCTS_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Bellow is a function to get a product create Review on the product from backend
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.put(`/api/v1/review`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

//After doing all the above, the next is now pulling data from the state into your components
