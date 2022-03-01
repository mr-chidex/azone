import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  SET_USER,
  SIGNUP_FAILED,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  USER,
  USER_TOKEN,
} from "../constants/user";

export const loginUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });

      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });

      const token = data.token;
      Cookies.set(USER_TOKEN, token);
      setAuthorizationHeader(token);

      const decodedToken = jwtDecode(token);
      dispatch(setUser(decodedToken));

      dispatch({ type: LOGIN_SUCCESS });
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
      dispatch({
        type: LOGIN_FAILED,
        payload: error?.response?.data?.message || error?.message,
      });
    }
  };

export function setUser(data) {
  Cookies.set(USER, JSON.stringify(data));
  return { type: SET_USER, payload: data };
}

// function to logout the user
export function logOutUser() {
  return (dispatch) => {
    Cookies.remove(USER_TOKEN);
    Cookies.remove(USER);

    delete axios.defaults.headers.common["Authorization"];
    dispatch({ type: LOGOUT_USER });
  };
}

export const setAuthorizationHeader = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const signupUser =
  ({ email, password, name }) =>
  async (dispatch) => {
    try {
      dispatch({ type: SIGNUP_REQUEST });

      await axios.post("/api/users/signup", {
        email,
        password,
        name,
      });

      toast.success("Signup successful. Proceed to login");

      dispatch({ type: SIGNUP_SUCCESS });
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
      dispatch({
        type: SIGNUP_FAILED,
        payload: error?.response?.data?.message || error?.message,
      });
    }
  };
