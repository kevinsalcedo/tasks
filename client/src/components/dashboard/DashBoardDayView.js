import React from "react";
import { connect } from "react-redux";
import { toggleCreateTaskForm } from "../../actions/dashboard";
import moment from "moment";
import { Box, Heading, Button } from "grommet";
import { Add } from "grommet-icons";
import Spinner from "../layout/Spinner";
import TaskCard from "../layout/containers/TaskCard";

const DashBoardDayView = ({
  calendar,
  loading,
  onChangeDate,
  toggleCreateTaskForm,
}) => {
  if (loading) {
    return <Spinner />;
  }
  const openTaskForm = (date) => {
    if (date) {
      onChangeDate(date, () => toggleCreateTaskForm(true));
    }
  };

  return (
    <Box direction='row' fill='vertical' gap='small' width='80%'>
      {Object.keys(calendar).map((dateGroup) => (
        <Box
          key={dateGroup}
          gap='small'
          align='center'
          fill='vertical'
          width='medium'
          overflow='auto'
          background='light-5'
          elevation='small'
          round='xsmall'
        >
          <Heading level='4' pad={"bottom"}>
            {moment(dateGroup).format("MMMM Do")}
          </Heading>
          <Box gap='small' overflow='auto' width='85%' fill='vertical'>
            <Box
              onClick={() => openTaskForm(moment(dateGroup))}
              pad={{ horizontal: "medium", vertical: "xxsmall" }}
              background='light-1'
              elevation='small'
              gap='small'
              justify='between'
              align='center'
              flex={false}
              height='xxsmall'
              hoverIndicator
            >
              <Button icon={<Add />} />
            </Box>
            {calendar[dateGroup].map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

const mapStateToProps = (state) => ({
  calendar: state.list.calendar,
  loading: state.loading.loading,
});

export default connect(mapStateToProps, { toggleCreateTaskForm })(
  DashBoardDayView
);
