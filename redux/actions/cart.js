import Cookies from "js-cookie";
import axios from "axios";

import {
  ADD_TO_CART,
  PLACE_ORDER_SUCCESS,
  QTY_CHANGE,
  REMOVE_FROM_CART,
  SAVE_PAYMENT_METHOD,
  SAVE_SHIPPING_ADDRESS,
} from "../constants/cart";
import { toast } from "react-toastify";

export const addToCartAction = (product) => async (dispatch) => {
  dispatch({ type: ADD_TO_CART, payload: { ...product, qty: 1 } });
};

export const changeQty = (itemId, qty) => async (dispatch) => {
  dispatch({ type: QTY_CHANGE, payload: { itemId, qty } });
};

export const removeFromCart = (itemId) => async (dispatch) => {
  dispatch({ type: REMOVE_FROM_CART, payload: { itemId } });
};

export const saveShippingAddress = (address) => (dispatch) => {
  Cookies.set("shippingAddress", JSON.stringify(address));
  dispatch({ type: SAVE_SHIPPING_ADDRESS, payload: address });
};

export const savePaymentMthod = (method) => (dispatch) => {
  Cookies.set("paymentMethod", JSON.stringify(method));
  dispatch({ type: SAVE_PAYMENT_METHOD, payload: method });
};

export const placeOrderAction = () => async (dispatch) => {
  dispatch({ type: PLACE_ORDER_SUCCESS });
};

export const makePayment = (orderId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/orders/${orderId}`);
    console.log(data);
  } catch (err) {
    toast.error("support working to fix error");
  }
};
