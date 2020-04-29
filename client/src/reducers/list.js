import {
  GET_LISTS,
  LIST_ERROR,
  SELECT_LIST,
  SET_DATE,
  GET_TASKS,
  TASK_ERROR,
  GET_CALENDAR,
} from "../actions/types";
import moment from "moment";

const initialState = {
  lists: [],
  tasks: [],
  calendar: {},
  selectedList: null,
  startDate: moment().startOf("day").format(),
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_LISTS:
      return {
        ...state,
        lists: payload.lists,
      };
    case SELECT_LIST:
      return {
        ...state,
        selectedList: payload,
      };
    case GET_TASKS:
      return {
        ...state,
        tasks: payload,
      };
    case GET_CALENDAR:
      return {
        ...state,
        calendar: payload,
      };
    case SET_DATE:
      return { ...state, startDate: payload };
    case LIST_ERROR:
    case TASK_ERROR:
      return {
        ...state,
        lists: [],
        tasks: [],
        selectedList: null,
        startDate: moment().format(),
      };
    default:
      return state;
  }
}
