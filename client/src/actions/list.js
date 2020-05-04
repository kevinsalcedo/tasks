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
} from "./types";
import { loadRequest, loadResponse } from "./loading";
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

// Load tasks for selected list, loading all if id is null
export const loadTasks = (id, start, isCalendar) => async (dispatch) => {
  dispatch(loadRequest());
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  let end = moment(start).add(1, "months").endOf("day").format();
  let actionType = GET_TASKS;

  // Check if calendar view is selected
  if (isCalendar === "calendar") {
    actionType = GET_CALENDAR;
    end = moment(start).add(2, "days").endOf("day").format();
  } else {
    start = moment(start).subtract(1, "week").format();
  }

  const extension = !id ? `tasks` : `${id}/tasks`;

  try {
    const res = await axios.get(
      `/api/tasklists/${extension}?start=${start}&end=${end}`
    );

    let tasks =
      isCalendar === "calendar"
        ? generateCalendar(start, end, res.data)
        : res.data;
    dispatch({
      type: actionType,
      payload: tasks,
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
  const listId = taskList.value;
  const body = JSON.stringify({ name, description, taskList: listId });

  try {
    const res = await axios.post(`api/tasklists/${listId}/tasks`, body, config);
    console.log(res);
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
