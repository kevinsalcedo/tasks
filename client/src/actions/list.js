import axios from "axios";
import {
  GET_LISTS,
  LIST_ERROR,
  SELECT_LIST,
  SELECT_TASK,
  GET_TASKS,
  TASK_ERROR,
  CREATE_TASK,
  CREATE_TASK_ERROR,
  DELETE_TASK,
  DELETE_TASK_ERROR,
  UPDATE_TASK,
  UPDATE_TASK_ERROR,
  CREATE_LIST,
} from "./types";
import { loadRequest, loadResponse } from "./loading";
import moment from "moment";
import setAuthToken from "../utils/setAuthToken";
import { generateCalendar } from "../utils/CalendarUtils";
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

// Set the current selected task
// Used to propogate task information into the update/delete forms
export const selectTask = (task) => (dispatch) => {
  dispatch({
    type: SELECT_TASK,
    payload: task,
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

// Load tasks for selected list, loading all if id is null and filtering by dates, if provided
export const loadTasksView = (id, start) => async (dispatch) => {
  dispatch(loadRequest());
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const dateFilter = start
    ? `?start=${start}&end=${moment(start)
        .add(2, "days")
        .endOf("day")
        .format()}`
    : "";
  const listFilter = !id ? `/tasks${dateFilter}` : `/${id}/tasks${dateFilter}`;
  try {
    const res = await axios.get(`/api/tasklists${listFilter}`);
    dispatch({
      type: GET_TASKS,
      payload: {
        tasks: res.data,
        calendar: start ? generateCalendar(res.data, start) : {},
      },
    });
  } catch (err) {
    console.log(err);
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
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  var backlog = endDate === null;
  const body = JSON.stringify({
    name,
    description,
    taskList,
    startDate: startDate ? startDate.utc().format() : null,
    endDate: endDate
      ? endDate.utc().format()
      : moment().endOf("day").utc().format(),
    backlog,
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
      payload: res.data.task,
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

// Mark a task as completed
export const updateTask = (
  taskID,
  name,
  description,
  taskList,
  startDate,
  endDate
) => async (dispatch) => {
  dispatch(loadRequest());
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  var backlog = endDate === null;
  const body = JSON.stringify({
    name,
    description,
    taskList,
    startDate: startDate ? startDate.utc().format() : null,
    endDate: endDate ? endDate.utc().format() : null,
    backlog,
  });

  try {
    const res = await axios.put(
      `api/tasklists/${taskList}/tasks/${taskID}`,
      body,
      config
    );
    dispatch({ type: UPDATE_TASK, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: UPDATE_TASK_ERROR });
  } finally {
    dispatch(loadResponse());
  }
};

// Create a new task list
export const createList = (formValues) => async (dispatch) => {
  dispatch(loadRequest());
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = { headers: { "Content-Type": "application/json" } };
  const body = JSON.stringify(formValues);

  try {
    const res = await axios.post("api/tasklists", body, config);
    dispatch({ type: CREATE_LIST, payload: res.data });
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(loadResponse());
  }
};
