import { DARK_MODE } from "../constants/UI";

export const chageTheme = (mode) => (dispatch) => {
  dispatch({
    type: DARK_MODE,
    payload: mode,
  });
};
