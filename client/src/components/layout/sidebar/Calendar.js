import React from "react";
import { connect } from "react-redux";
import { Calendar as GrommetCalendar } from "grommet";
import { setDateRange } from "../../../actions/dashboard";
import moment from "moment";

class Calendar extends React.Component {
  // Every time a new date is selected, we should query the database for the new range of dates
  // Not just set dates
  onSelect = (nextDate) => {
    // Get the start and end dates in local time zone
    const startDate = moment(nextDate).startOf("day").format();
    this.props.setDateRange(startDate);
  };
  render() {
    const { startDate } = this.props;
    return (
      <GrommetCalendar
        size='small'
        date={startDate}
        onSelect={this.onSelect}
        bounds={["2020-01-01", "2030-12-31"]}
      />
    );
  }
}
const mapStateToProps = (state) => ({
  selectedList: state.list.selectedList,
  startDate: state.list.startDate,
});
export default connect(mapStateToProps, { setDateRange })(Calendar);
