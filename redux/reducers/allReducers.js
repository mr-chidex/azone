import { combineReducers } from "redux";

import { UIReducer } from "./UI";

export const allReducers = combineReducers({
  UI: UIReducer,
});
