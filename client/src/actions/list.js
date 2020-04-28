import axios from "axios";
import {
  GET_LISTS,
  LIST_ERROR,
  SELECT_LIST,
  GET_TASKS,
  TASK_ERROR,
} from "./types";
import moment from "moment";
import setAuthToken from "../utils/setAuthToken";

// SELECTORS - these only change the application wide state
// Selectors do not make API calls

// Set the new selected list - null means none selected
export const selectList = (id) => (dispatch) => {
  dispatch({
    type: SELECT_LIST,
    payload: id,
  });
};

// API CALLS - these take application wide state (passed in methods)
// And make a call to the API with the queried data

// Get lists for a user
export const loadLists = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/tasklists");

    dispatch({
      type: GET_LISTS,
      payload: { lists: res.data },
    });
  } catch (err) {
    dispatch({
      type: LIST_ERROR,
    });
  }
};

// Load tasks for selected list, loading all if id is null
export const loadTasks = (id, start, isCalendar) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  // Default get one year ahead (?)
  let end;
  if (isCalendar === "calendar") {
    end = moment(start).add(2, "days").format();
  } else {
    start = moment(start).startOf("year").format();
    end = moment(start).add(1, "years").format();
  }

  const extension = !id ? `tasks` : `${id}/tasks`;

  try {
    const res = await axios.get(
      `/api/tasklists/${extension}?start=${start}&end=${end}`
    );

    let calendar = generateCalendar(start, end, res.data);
    dispatch({
      type: GET_TASKS,
      payload: calendar,
    });
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
    });
  }
};

// Helper method to parse a list of tasks into calendar format
const generateCalendar = (startDate, endDate, tasks) => {
  const calendar = {};
  const start = moment(startDate);
  const end = moment(endDate);
  let curr = start;

  while (!curr.isAfter(end, "day")) {
    calendar[curr.startOf("day").format()] = [];
    curr = curr.add(1, "days");
  }
  tasks.forEach((task) => {
    const create = moment(task.createDate);
    calendar[create.startOf("day").format()].push(task);
  });
  return calendar;
};
