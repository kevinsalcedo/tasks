import { LOADING_START, LOADING_END } from "../actions/types";

const initialState = {
  loading: true,
};

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
    case LOADING_START:
      return { ...state, loading: true };
    case LOADING_END:
    default:
      return { ...state, loading: false };
  }
}
