import axios from "axios";
import { batch } from "react-redux";
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
  CREATE_LIST_ERROR,
  GET_BACKLOG,
  BACKLOG_ERROR,
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
    const errors = err.response.data.errors;

    batch(() => {
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: LIST_ERROR,
      });
    });
  } finally {
    dispatch(loadResponse());
  }
};

// Load tasks for selected list, loading all if id is null and filtering by dates, if provided
export const loadTasksView = (listID, start) => async (dispatch) => {
  dispatch(loadRequest());
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const dateFilter = start
    ? `?start=${start}&end=${moment(start)
        .add(3, "days")
        .endOf("day")
        .format()}`
    : "";
  const listFilter = !listID
    ? `${dateFilter}`
    : `/lists/${listID}${dateFilter}`;
  try {
    const res = await axios.get(`/api/tasks${listFilter}`);
    dispatch({
      type: GET_TASKS,
      payload: {
        tasks: res.data,
        calendar: start ? generateCalendar(res.data, start) : {},
      },
    });
  } catch (err) {
    const errors = err.response.data.errors;

    batch(() => {
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: TASK_ERROR,
      });
    });
  } finally {
    dispatch(loadResponse());
  }
};

// Load all backlog tasks
export const loadBacklogTasks = () => async (dispatch) => {
  dispatch(loadRequest());
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const filter = "?backlog=true";
  try {
    const res = await axios.get(`/api/tasks${filter}`);
    dispatch({
      type: GET_BACKLOG,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    batch(() => {
      if (errors) {
        errors.forEach((error) => dispatch(error.msg, "danger"));
      }
      dispatch({
        type: BACKLOG_ERROR,
      });
    });
  }
};

// Create a task for a selected task list
export const createTask = (formValues) => async (dispatch) => {
  dispatch(loadRequest());
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const { startDate, endDate } = formValues;

  if (startDate) {
    formValues.startDate = moment(startDate).utc().format();
  }
  if (endDate) {
    formValues.endDate = moment(endDate).utc().format();
  } else {
    formValues.endDate = moment().endOf("day").utc().format();
  }

  const body = JSON.stringify(formValues);

  try {
    const res = await axios.post(`api/tasks`, body, config);
    batch(() => {
      if (formValues.backlog) {
        dispatch(setAlert("Task sent to backlog", "good"));
      }
      dispatch({ type: CREATE_TASK, payload: res.data });
    });
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    batch(() => {
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: CREATE_TASK_ERROR,
      });
    });
  } finally {
    dispatch(loadResponse());
  }
};

// Delete a task
export const deleteTask = (taskID) => async (dispatch) => {
  dispatch(loadRequest());
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.delete(`api/tasks/${taskID}`);
    batch(() => {
      dispatch({
        type: DELETE_TASK,
        payload: res.data.task,
      });
      dispatch(setAlert(res.data.msg, "good"));
    });
  } catch (err) {
    const errors = err.response.data.errors;

    batch(() => {
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: DELETE_TASK_ERROR,
      });
    });
  } finally {
    dispatch(loadResponse());
  }
};

// Mark a task as completed
export const updateTask = (taskID, formValues) => async (dispatch) => {
  dispatch(loadRequest());
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const { startDate, endDate } = formValues;
  if (startDate) {
    formValues.startDate = moment(startDate).utc().format();
  }
  if (endDate) {
    formValues.endDate = moment(endDate).utc().format();
  }

  const body = JSON.stringify(formValues);

  try {
    const res = await axios.put(`api/tasks/${taskID}`, body, config);
    batch(() => {
      dispatch({ type: UPDATE_TASK, payload: res.data });
      dispatch(setAlert(`${res.data.task.name} was updated.`, "status-good"));
    });
  } catch (err) {
    const errors = err.response.data.errors;

    batch(() => {
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({ type: UPDATE_TASK_ERROR });
    });
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
    const errors = err.response.data.errors;

    batch(() => {
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({ type: CREATE_LIST_ERROR });
    });
  } finally {
    dispatch(loadResponse());
  }
};
