import { DARK_MODE_OFF, DARK_MODE_ON } from "../constants/UI";

export const changeTheme = (darkMode) => (dispatch) => {
  dispatch({ type: darkMode ? DARK_MODE_OFF : DARK_MODE_ON });
};
