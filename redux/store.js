import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";
import thunk from "redux-thunk";
import { allReducers } from "./reducers/allReducers";

const middlewares = [thunk];

const initStore = () => {
  return createStore(
    allReducers,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
};

export const wrapper = createWrapper(initStore);
