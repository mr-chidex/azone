import { DARK_MODE } from "../constants/UI";

const initailState = { mode: false };

export const UIReducer = (state = initailState, { type, payload }) => {
  switch (type) {
    case DARK_MODE:
      return {
        ...state,
        mode: payload,
      };

    default:
      return state;
  }
};
