import axios from "axios";
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
} from "./types";
import { loadRequest, loadResponse } from "./loading";
import moment from "moment";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alert";

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
  dispatch(loadRequest());
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
  } finally {
    dispatch(loadResponse());
  }
};

// Load all tasks for selected list, loading all if id is null
export const loadTasksView = (id) => async (dispatch) => {
  dispatch(loadRequest());
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  console.log("Load Tasks All");
  const listFilter = !id ? `/tasks` : `/${id}/tasks`;
  try {
    const res = await axios.get(`/api/tasklists${listFilter}`);
    dispatch({
      type: GET_TASKS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
    });
  } finally {
    dispatch(loadResponse());
  }
};

// Load tasks in a calendar view for a selected list, loading all lists if id is null
export const loadCalendarView = (id, start) => async (dispatch) => {
  dispatch(loadRequest());
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  console.log("Load Tasks Calendar");

  let end = moment(start).add(2, "days").endOf("day").format();

  const extension = !id ? `tasks` : `${id}/tasks`;

  try {
    const res = await axios.get(
      `/api/tasklists/${extension}?start=${start}&end=${end}`
    );

    dispatch({
      type: GET_CALENDAR,
      payload: generateCalendar(start, end, res.data),
    });
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
    });
  } finally {
    dispatch(loadResponse());
  }
};

// Create a task for a selected task list
export const createTask = (
  name,
  description,
  taskList,
  startDate,
  endDate
) => async (dispatch) => {
  dispatch(loadRequest());
  console.log("create task action");
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const utcDueDate = moment(endDate).utc().format();
  const body = JSON.stringify({
    name,
    description,
    taskList: taskList,
    endDate: utcDueDate,
  });

  try {
    const res = await axios.post(
      `api/tasklists/${taskList}/tasks`,
      body,
      config
    );
    dispatch({ type: CREATE_TASK, payload: res.data });
  } catch (err) {
    console.log(err);
    // const errors = err.response.data.errors;

    // if (errors) {
    //   errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    // }
    dispatch({
      type: CREATE_TASK_ERROR,
    });
  } finally {
    dispatch(loadResponse());
  }
};

// Delete a task
export const deleteTask = (taskID, listID) => async (dispatch) => {
  dispatch(loadRequest());
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.delete(`api/tasklists/${listID}/tasks/${taskID}`);
    dispatch({
      type: DELETE_TASK,
      payload: taskID,
    });
    dispatch(setAlert(res.data.msg, "good"));
  } catch (err) {
    // TODO: send error alerts
    console.log(err);
    dispatch({
      type: DELETE_TASK_ERROR,
    });
  } finally {
    dispatch(loadResponse());
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
