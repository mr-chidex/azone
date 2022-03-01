import Cookies from "js-cookie";
import {
  ADD_TO_CART,
  QTY_CHANGE,
  REMOVE_FROM_CART,
  SAVE_SHIPPING_ADDRESS,
} from "../constants/cart";

const address = Cookies.get("shippingAddress")
  ? JSON.parse(Cookies.get("shippingAddress"))
  : {};

const initailState = {
  cart: {
    cartItems: Cookies.get("cartItems")
      ? JSON.parse(Cookies.get("cartItems"))
      : [],
  },
  shippingAddress: { ...address },
};

export const CartReducer = (state = initailState, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART: {
      const newProd = payload;
      const prodExist = state.cart.cartItems.find(
        (prod) => prod._id === newProd._id
      );

      const cartItems = prodExist
        ? state.cart.cartItems.map((prod) =>
            prod._id === newProd._id
              ? { ...prod, qty: parseInt(prod.qty) + 1 }
              : prod
          )
        : [...state.cart.cartItems, newProd];

      // const cartItems = prodExist
      //   ? state.cart.cartItems
      //   : [...state.cart.cartItems, newProd];

      Cookies.set("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case QTY_CHANGE: {
      const cartItems = state.cart.cartItems.map((prod) =>
        prod._id === payload.itemId ? { ...prod, qty: payload.qty } : prod
      );

      Cookies.set("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case REMOVE_FROM_CART: {
      const cartItems = state.cart.cartItems.filter(
        (prod) => prod._id !== payload.itemId
      );

      Cookies.set("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case SAVE_SHIPPING_ADDRESS: {
      return { ...state, shippingAddress: payload };
    }
    default:
      return state;
  }
};
