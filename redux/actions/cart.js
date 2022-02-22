import { ADD_TO_CART, QTY_CHANGE, REMOVE_FROM_CART } from "../constants/cart";

export const addToCartAction = (product) => async (dispatch) => {
  dispatch({ type: ADD_TO_CART, payload: { ...product, qty: 1 } });
};

export const changeQty = (itemId, qty) => async (dispatch) => {
  dispatch({ type: QTY_CHANGE, payload: { itemId, qty } });
};

export const removeFromCart = (itemId) => async (dispatch) => {
  dispatch({ type: REMOVE_FROM_CART, payload: { itemId } });
};
