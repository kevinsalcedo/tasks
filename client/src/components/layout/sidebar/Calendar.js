import React from "react";
import { connect } from "react-redux";
import { Box, Calendar as GrommetCalendar, Collapsible } from "grommet";
import { setCalendarRange } from "../../../actions/dashboard";
import moment from "moment";

const Calendar = ({ calendarStart, setCalendarRange, view }) => {
  return (
    <Collapsible open={view === "calendar"}>
      <Box align='center' pad='small'>
        <GrommetCalendar
          size='small'
          date={calendarStart}
          onSelect={(nextDate) =>
            setCalendarRange(moment(nextDate).startOf("day").format())
          }
          bounds={["2020-01-01", "2030-12-31"]}
        />
      </Box>
    </Collapsible>
  );
};
const mapStateToProps = (state) => ({
  view: state.dashboard.view,
  calendarStart: state.dashboard.calendarStart,
});
export default connect(mapStateToProps, { setCalendarRange })(Calendar);
