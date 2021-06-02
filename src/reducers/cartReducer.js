import {
  ADD_TO_CART,
  REMOVE_ITEM_CART,
  SAVE_SHIPPING_INFO,
} from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [],shippingInfo:{}}, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const isItemExists = state.cartItems.find(
        (i) => i.product === item.product
      );
      if (isItemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExists.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case REMOVE_ITEM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };
      case SAVE_SHIPPING_INFO:
          return{
              ...state,
              shipping_info:action.payload
          }
    default:
      return state;
  }


};
