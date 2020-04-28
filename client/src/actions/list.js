import axios from "axios";
import {
  GET_LISTS,
  LIST_ERROR,
  SELECT_LIST,
  SELECT_ERROR,
  SET_DATE,
  DATE_ERROR,
} from "./types";
import moment, { utc } from "moment";
import setAuthToken from "../utils/setAuthToken";

// Get lists for a user
export const loadLists = (start, end) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(`/api/tasklists?start=${start}&end=${end}`);

    // Split up the tasks into consumable format before reaching the user
    let calendar = generateCalendar(start, end, res.data.allTasks);
    console.log(calendar);
    dispatch({
      type: GET_LISTS,
      payload: { lists: res.data.lists, tasks: res.data.allTasks },
    });
  } catch (err) {
    dispatch({
      type: LIST_ERROR,
    });
  }
};

// Set the selected list
export const selectList = (id, start, end) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const extension = !id ? `tasks` : `${id}/tasks`;

  // Take any start and end query parameters
  const startDate = moment(start).utc().startOf("day").format();
  const endDate = moment(end).utc().startOf("day").format();

  try {
    const res = await axios.get(
      `/api/tasklists/${extension}?start=${startDate}&end=${endDate}`
    );

    let calendar = this.generateCalendar(startDate, endDate, res.data);

    dispatch({
      type: SELECT_LIST,
      payload: {
        selectedList: id,
        tasks: calendar,
      },
    });
  } catch (err) {
    dispatch({
      type: SELECT_ERROR,
    });
  }
};

// Set the selected calendar days
export const setDateRange = (start, end) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    dispatch({
      type: SET_DATE,
      payload: {
        start,
        end,
      },
    });
  } catch (err) {
    dispatch({ type: DATE_ERROR });
  }
};

const generateCalendar = (startDate, endDate, tasks) => {
  const calendar = {};
  const start = moment(startDate);
  const end = moment(endDate);
  let curr = start;

  while (!curr.isAfter(end, "day")) {
    calendar[curr.startOf("day").format()] = [];
    curr = curr.add(1, "days");
  }
  console.log(calendar);
  tasks.forEach((task) => {
    const create = moment(task.createDate);
    calendar[create.startOf("day").format()].push(task);
  });
  return calendar;
};
