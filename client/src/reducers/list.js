import {
  GET_LISTS,
  LIST_ERROR,
  SELECT_LIST,
  GET_TASKS,
  TASK_ERROR,
  GET_CALENDAR,
  CREATE_TASK,
  CREATE_TASK_ERROR,
  DELETE_TASK,
  DELETE_TASK_ERROR,
} from "../actions/types";

const initialState = {
  lists: [],
  tasks: [],
  calendar: {},
  selectedList: null,
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
    case CREATE_TASK:
      return { ...state, tasks: [...state.tasks, payload] };
    case DELETE_TASK:
      return {
        ...state,
        tasks: [...state.tasks.filter((task) => task._id !== payload)],
      };
    case LIST_ERROR:
    case TASK_ERROR:
      return {
        ...state,
        lists: [],
        tasks: [],
        selectedList: null,
      };
    case CREATE_TASK_ERROR:
    case DELETE_TASK_ERROR:
    default:
      return state;
  }
}
