import {
  GET_LISTS,
  LIST_ERROR,
  SELECT_LIST,
  SELECT_TASK,
  GET_TASKS,
  TASK_ERROR,
  GET_CALENDAR,
  CREATE_TASK,
  CREATE_TASK_ERROR,
  DELETE_TASK,
  DELETE_TASK_ERROR,
  UPDATE_TASK,
  UPDATE_TASK_ERROR,
} from "../actions/types";
import { addToCalendar, removeFromCalendar } from "../utils/CalendarUtils";
import moment from "moment";

const initialState = {
  lists: [],
  tasks: [],
  calendar: {},
  selectedList: null,
  selectedTask: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  let calendar;
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
    case SELECT_TASK:
      return {
        ...state,
        selectedTask: payload,
      };
    case GET_TASKS:
      return {
        ...state,
        tasks: payload.tasks,
        calendar: payload.calendar,
      };
    case GET_CALENDAR:
      return {
        ...state,
        calendar: payload,
      };
    case CREATE_TASK:
      calendar = state.calendar;
      if (Object.keys(calendar).length > 0) {
        addToCalendar(calendar, payload);
      }
      return {
        ...state,
        tasks: [...state.tasks, payload].sort((a, b) =>
          moment(a.endDate).diff(b.endDate)
        ),
        calendar,
      };
    case UPDATE_TASK:
      let tasks = state.tasks.filter((task) => task._id !== payload._id);

      if (!payload.backlog) {
        tasks = [...tasks, payload];
      }
      calendar = state.calendar;
      if (Object.keys(calendar).length > 0) {
        removeFromCalendar(calendar, payload, true);
      }
      return {
        ...state,
        tasks: tasks.sort((a, b) => moment(a.endDate).diff(b.endDate)),
        calendar,
        selectedTask: null,
      };
    case DELETE_TASK:
      calendar = state.calendar;
      if (Object.keys(calendar).length > 0) {
        removeFromCalendar(calendar, payload, false);
      }
      return {
        ...state,
        tasks: [...state.tasks.filter((task) => task._id !== payload._id)],
        calendar,
        selectedTask: null,
      };
    case LIST_ERROR:
    case TASK_ERROR:
      return {
        ...state,
        lists: [],
        tasks: [],
        selectedList: null,
        selectedTask: null,
      };
    case CREATE_TASK_ERROR:
    case UPDATE_TASK_ERROR:
    case DELETE_TASK_ERROR:
    default:
      return state;
  }
}
