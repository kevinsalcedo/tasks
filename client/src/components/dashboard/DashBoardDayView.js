import React from "react";
import { connect } from "react-redux";
import { toggleCreateTaskForm } from "../../actions/dashboard";
import moment from "moment";
import { Box, Heading, Button, ResponsiveContext } from "grommet";
import { Add } from "grommet-icons";
import TaskCard from "../layout/containers/TaskCard";
import { loadTasksView } from "../../actions/list";
import Spinner from "../layout/Spinner";

class DashBoardDayView extends React.Component {
  componentDidMount() {
    const { selectedList, calendarStart, loadTasksView } = this.props;
    loadTasksView(selectedList, calendarStart);
  }

  componentDidUpdate(prevProps) {
    const { calendarStart, selectedList, loadTasksView } = this.props;
    if (
      prevProps.selectedList !== selectedList ||
      prevProps.calendarStart !== calendarStart
    ) {
      loadTasksView(selectedList, calendarStart);
    }
  }

  componentWillUnmount() {
    const { onChangeDate } = this.props;
    onChangeDate(moment());
  }

  openTaskForm = (date) => {
    const { onChangeDate, toggleCreateTaskForm } = this.props;
    if (date) {
      onChangeDate(date, () => toggleCreateTaskForm(true));
    }
  };

  sliceKeys = (keyArray, size) => {
    if (keyArray.length > 1) {
      if (size === "small") {
        return [keyArray[0]];
      } else if (size === "medium") {
        return [keyArray[0], keyArray[1]];
      }
    }

    return keyArray;
  };

  render() {
    const { calendar, loading } = this.props;
    if (!calendar) {
      return <Spinner />;
    }
    return (
      <ResponsiveContext.Consumer>
        {(responsive) => (
          <Box direction='row' fill='vertical' gap='small' width='95%'>
            {this.sliceKeys(Object.keys(calendar), responsive).map(
              (dateGroup) => (
                <Box
                  key={dateGroup}
                  align='center'
                  fill
                  overflow='auto'
                  background='light-5'
                  elevation='small'
                  round='xsmall'
                >
                  <Heading level='4' pad={"bottom"}>
                    {moment(dateGroup).format("MMMM Do")}
                  </Heading>

                  <Box overflow='auto' fill pad='small'>
                    <Box
                      onClick={() => this.openTaskForm(moment(dateGroup))}
                      pad={{ horizontal: "medium", vertical: "xxsmall" }}
                      background='light-1'
                      elevation='small'
                      justify='between'
                      align='center'
                      flex={false}
                      height='xxsmall'
                      hoverIndicator
                      margin={{ bottom: "5px" }}
                    >
                      <Button icon={<Add />} hoverIndicator={false} />
                    </Box>
                    {loading ? (
                      <Spinner />
                    ) : (
                      calendar[dateGroup].map((task) => (
                        <TaskCard key={task._id} task={task} />
                      ))
                    )}
                  </Box>
                </Box>
              )
            )}
          </Box>
        )}
      </ResponsiveContext.Consumer>
    );
  }
}

const mapStateToProps = (state) => ({
  calendar: state.list.calendar,
  loading: state.loading.loading,
  calendarStart: state.dashboard.calendarStart,
  selectedList: state.list.selectedList,
});

export default connect(mapStateToProps, {
  toggleCreateTaskForm,
  loadTasksView,
})(DashBoardDayView);
