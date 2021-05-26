import axios from 'axios';
import { ADD_TO_CART } from '../constants/cartConstants';
export const addItemToCart =
  (id, cartQuantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.data._id,
        name: data.data.name,
        price: data.data.price,
        image: data.data.images[0].url,
        manufacturer: data.data.manufacturer,
        quantity: data.data.quantity,
        cartQuantity,
      },
    });
    //putting the cart items into the local storage of browser
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  };
