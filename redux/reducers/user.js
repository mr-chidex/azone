import {
  LOGIN_REQUEST,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  SET_USER,
} from "../constants/user";

const initailState = {
  userData: {},
  isAuth: false,
};

export const userReducer = (state = initailState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: true,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isAuth: false,
      };
    case SET_USER:
      return {
        ...state,
        isAuth: true,
        userData: payload,
      };
    default:
      return { ...state };
  }
};
