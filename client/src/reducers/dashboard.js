import { CHANGE_VIEW, SET_CALENDAR_RANGE } from "../actions/types";
import moment from "moment";

const initialState = {
  view: "task",
  calendarStart: moment().startOf("day").format(),
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_VIEW:
      return {
        ...state,
        view: payload,
      };
    case SET_CALENDAR_RANGE:
      return { ...state, calendarStart: payload };
    default:
      return state;
  }
}
