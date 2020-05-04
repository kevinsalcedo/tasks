import React from "react";
import { connect } from "react-redux";
import { Calendar as GrommetCalendar } from "grommet";
import { setDateRange } from "../../../actions/dashboard";
import moment from "moment";

const Calendar = ({ startDate, setDateRange }) => {
  return (
    <GrommetCalendar
      size="small"
      date={startDate}
      onSelect={(nextDate) =>
        setDateRange(moment(nextDate).startOf("day").format())
      }
      bounds={["2020-01-01", "2030-12-31"]}
    />
  );
};
const mapStateToProps = (state) => ({
  startDate: state.list.startDate,
});
export default connect(mapStateToProps, { setDateRange })(Calendar);
