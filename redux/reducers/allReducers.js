import { combineReducers } from "redux";

import { UIReducer } from "./UI";
import { CartReducer } from "./cart";
import { userReducer } from "./user";

export const allReducers = combineReducers({
  UI: UIReducer,
  CART: CartReducer,
  USER: userReducer,
});
