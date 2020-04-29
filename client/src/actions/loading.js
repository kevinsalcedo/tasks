import { LOADING_START, LOADING_END } from "./types";

export const loadRequest = () => (dispatch) => {
  dispatch({
    type: LOADING_START,
  });
};

export const loadResponse = () => (dispatch) => {
  dispatch({
    type: LOADING_END,
  });
};
