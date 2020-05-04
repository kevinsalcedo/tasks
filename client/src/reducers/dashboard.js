import {
  CHANGE_VIEW,
  SET_CALENDAR_RANGE,
  SET_DEFAULT_DUE_DATE,
} from "../actions/types";
import moment from "moment";

const initialState = {
  view: "task",
  calendarStart: moment().startOf("day").format(),
  defaultDueDate: moment().format("MM/DD/YYYY hh:mm a"),
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
    case SET_DEFAULT_DUE_DATE:
      return { ...state, defaultTaskDate: payload };
    default:
      return state;
  }
}
