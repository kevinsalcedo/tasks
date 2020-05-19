import {
  CHANGE_VIEW,
  SET_CALENDAR_RANGE,
  SIDEBAR_OPEN,
  BACKLOG_OPEN,
  TOGGLE_CREATE_TASK_FORM,
  TOGGLE_DELETE_TASK_FORM,
  TOGGLE_CREATE_LIST_FORM,
} from "../actions/types";
import moment from "moment";

const initialState = {
  view: "task",
  calendarStart: moment().startOf("day").format(),
  sidebarOpen: true,
  backlogOpen: false,
  createTaskOpen: false,
  deleteTaskOpen: false,
  createListOpen: false,
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
    case SIDEBAR_OPEN:
      return { ...state, sidebarOpen: payload };
    case BACKLOG_OPEN:
      return { ...state, backlogOpen: payload };
    case TOGGLE_CREATE_TASK_FORM:
      return { ...state, createTaskOpen: payload };
    case TOGGLE_DELETE_TASK_FORM:
      return { ...state, deleteTaskOpen: payload };
    case TOGGLE_CREATE_LIST_FORM:
      return { ...state, createListOpen: payload };
    default:
      return state;
  }
}
