import { CHANGE_VIEW, SET_DATE } from "./types";

// Set whether tasks should display in list view or calendar view
export const changeView = (viewType) => (dispatch) => {
  dispatch({
    type: CHANGE_VIEW,
    payload: viewType,
  });
};

// Set the selected calendar days
export const setDateRange = (start) => async (dispatch) => {
  dispatch({
    type: SET_DATE,
    payload: start,
  });
};
