import { CHANGE_VIEW, SET_CALENDAR_RANGE, SET_DEFAULT_DUE_DATE } from "./types";

// Set whether tasks should display in list view or calendar view
export const changeView = (viewType) => (dispatch) => {
  dispatch({
    type: CHANGE_VIEW,
    payload: viewType,
  });
};

// Set the selected calendar days
export const setCalendarRange = (start) => async (dispatch) => {
  dispatch({
    type: SET_CALENDAR_RANGE,
    payload: start,
  });
};

// Set the default task due date for task creation
export const setDefaultDueDate = (day) => async (dispatch) => {
  dispatch({
    type: SET_DEFAULT_DUE_DATE,
    payload: day,
  });
};
