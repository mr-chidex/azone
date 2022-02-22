import { combineReducers } from "redux";

import { UIReducer } from "./UI";
import { CartReducer } from "./cart";

export const allReducers = combineReducers({
  UI: UIReducer,
  CART: CartReducer,
});
