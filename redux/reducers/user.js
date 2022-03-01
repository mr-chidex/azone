import {
  LOGIN_REQUEST,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  SET_USER,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
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
        ...initailState,
      };
    case SET_USER:
      return {
        ...state,
        isAuth: true,
        userData: payload,
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case SIGNUP_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return { ...state };
  }
};
