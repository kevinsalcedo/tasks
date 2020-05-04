import React from "react";
import { connect } from "react-redux";
import { Calendar as GrommetCalendar } from "grommet";
import { setCalendarRange } from "../../../actions/dashboard";
import moment from "moment";

const Calendar = ({ calendarStart, setCalendarRange }) => {
  return (
    <GrommetCalendar
      size='small'
      date={calendarStart}
      onSelect={(nextDate) =>
        setCalendarRange(moment(nextDate).startOf("day").format())
      }
      bounds={["2020-01-01", "2030-12-31"]}
    />
  );
};
const mapStateToProps = (state) => ({
  calendarStart: state.dashboard.calendarStart,
});
export default connect(mapStateToProps, { setCalendarRange })(Calendar);
