import {
  GET_LISTS,
  LIST_ERROR,
  SELECT_LIST,
  SET_DATE,
  GET_TASKS,
  TASK_ERROR,
} from "../actions/types";
import moment from "moment";

const initialState = {
  lists: [],
  tasks: {},
  selectedList: null,
  loading: true,
  startDate: moment().startOf("day").format(),
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_LISTS:
      return {
        ...state,
        lists: payload.lists,
        loading: false,
      };
    case SELECT_LIST:
      return {
        ...state,
        selectedList: payload,
        loading: false,
      };
    case GET_TASKS:
      return {
        ...state,
        tasks: payload,
        loading: false,
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
        loading: false,
        startDate: moment().format(),
      };
    default:
      return state;
  }
}
