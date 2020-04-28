import {
  GET_LISTS,
  LIST_ERROR,
  SELECT_LIST,
  SELECT_ERROR,
  SET_DATE,
  DATE_ERROR,
} from "../actions/types";
import moment from "moment";

const initialState = {
  lists: [],
  tasks: {},
  selectedList: null,
  loading: true,
  startDate: moment().startOf("day").format(),
  endDate: moment().add(2, "days").endOf("day").format(),
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_LISTS:
      return {
        ...state,
        lists: payload.lists,
        tasks: payload.tasks,
        loading: false,
      };
    case SELECT_LIST:
      return {
        ...state,
        selectedList: payload.selectedList,
        tasks: payload.tasks,
      };
    case SET_DATE:
      return { ...state, startDate: payload.start, endDate: payload.end };
    case SELECT_ERROR:
    case LIST_ERROR:
    case DATE_ERROR:
      return {
        ...state,
        lists: [],
        tasks: [],
        selectedList: null,
        loading: false,
        startDate: moment().format(),
        endDate: moment().add(2, "days").format(),
      };
    default:
      return state;
  }
}
