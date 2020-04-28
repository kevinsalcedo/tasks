import { CHANGE_VIEW } from "../actions/types";

const initialState = {
  view: "task",
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_VIEW:
      return {
        ...state,
        view: payload,
      };
    default:
      return state;
  }
}
