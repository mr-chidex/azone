import { ADD_TO_CART } from "../constants/cart";

export const addToCartAction = (product) => async (dispatch) => {
  dispatch({ type: ADD_TO_CART, payload: { ...product, qty: 1 } });
};
