import Cookies from "js-cookie";
import { DARK_MODE, DARK_MODE_OFF, DARK_MODE_ON } from "../constants/UI";

const initailState = {
  darkMode: Cookies.get("darkMode") === "ON" ? true : false,
};

export const UIReducer = (state = initailState, { type, payload }) => {
  switch (type) {
    case DARK_MODE_ON:
      return {
        ...state,
        darkMode: true,
      };
    case DARK_MODE_OFF:
      return {
        ...state,
        darkMode: false,
      };

    default:
      return state;
  }
};
