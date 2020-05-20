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
  BACKLOG_ERROR,
  GET_BACKLOG,
} from "../actions/types";
import { addToCalendar, removeFromCalendar } from "../utils/CalendarUtils";
import moment from "moment";

const initialState = {
  lists: [],
  tasks: [],
  calendar: {},
  backlog: [],
  selectedList: null,
  selectedTask: null,
  updatedFields: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  let newCalendar = { ...state.calendar };
  let newTasks = [...state.tasks];
  let newBacklog = [...state.backlog];
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
      // Update the calendar if on calendar view
      if (Object.keys(newCalendar).length > 0) {
        addToCalendar(newCalendar, payload);
      }
      // Add task to proper list
      if (payload.backlog) {
        newBacklog.push(payload);
      } else {
        newTasks = [...newTasks, payload].sort((a, b) =>
          moment(a.endDate).diff(b.endDate)
        );
      }
      return {
        ...state,
        tasks: newTasks,
        calendar: newCalendar,
        backlog: newBacklog,
      };
    case UPDATE_TASK:
      const updatedFields = payload.updatedFields;
      let taskPlaced = false;
      // Changing the end date requires list shuffling
      if (updatedFields.backlogChanged) {
        if (payload.task.backlog) {
          newTasks = newTasks.filter((task) => task._id !== payload.task._id);
          newBacklog = [...newBacklog, payload.task];
        } else {
          newBacklog = newBacklog.filter(
            (task) => task._id !== payload.task._id
          );
          newTasks = [...newTasks, payload.task].sort((a, b) =>
            moment(a.endDate).diff(b.endDate)
          );
        }
        taskPlaced = true;
      } else {
        if (!payload.task.backlog && updatedFields.endDateChanged) {
          newTasks = [
            ...newTasks.filter((task) => task._id !== payload.task._id),
            payload.task,
          ].sort((a, b) => moment(a.endDate).diff(b.endDate));
          taskPlaced = true;
        }
      }

      if (!taskPlaced) {
        const index = newTasks.findIndex(
          (task) => task._id === payload.task._id
        );
        newTasks[index] = payload.task;
      }

      // Update the calendar if on calendar view
      if (Object.keys(newCalendar).length > 0) {
        removeFromCalendar(newCalendar, payload.task, true);
      }
      return {
        ...state,
        tasks: newTasks,
        calendar: newCalendar,
        selectedTask: null,
        backlog: newBacklog,
        updatedFields: payload.updatedFields,
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
    case GET_BACKLOG:
      return {
        ...state,
        backlog: payload,
      };
    case LIST_ERROR:
    case TASK_ERROR:
    case CREATE_TASK_ERROR:
    case UPDATE_TASK_ERROR:
    case DELETE_TASK_ERROR:
    case CREATE_LIST_ERROR:
    case BACKLOG_ERROR:
    default:
      return state;
  }
}
