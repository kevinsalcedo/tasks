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
  CREATE_LIST,
  CREATE_LIST_ERROR,
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
  let newCalendar = { ...state.calendar };
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
      if (Object.keys(newCalendar).length > 0) {
        addToCalendar(newCalendar, payload);
      }
      return {
        ...state,
        tasks: [...state.tasks, payload].sort((a, b) =>
          moment(a.endDate).diff(b.endDate)
        ),
        calendar: newCalendar,
      };
    case UPDATE_TASK:
      let newTasks = state.tasks.filter((task) => task._id !== payload._id);

      if (!payload.backlog) {
        newTasks = [...newTasks, payload];
      }
      if (Object.keys(newCalendar).length > 0) {
        removeFromCalendar(newCalendar, payload, true);
      }
      return {
        ...state,
        tasks: newTasks.sort((a, b) => moment(a.endDate).diff(b.endDate)),
        calendar: newCalendar,
        selectedTask: null,
      };
    case DELETE_TASK:
      if (Object.keys(newCalendar).length > 0) {
        removeFromCalendar(newCalendar, payload, false);
      }
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== payload._id),
        calendar: newCalendar,
        selectedTask: null,
      };
    case CREATE_LIST:
      return {
        ...state,
        lists: [...state.lists, payload],
      };
    case LIST_ERROR:
    case TASK_ERROR:
    case CREATE_TASK_ERROR:
    case UPDATE_TASK_ERROR:
    case DELETE_TASK_ERROR:
    case CREATE_LIST_ERROR:
    default:
      return state;
  }
}
