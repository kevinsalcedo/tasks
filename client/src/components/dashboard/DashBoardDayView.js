import React from "react";
import { connect } from "react-redux";
import { toggleCreateTaskForm } from "../../actions/dashboard";
import moment from "moment";
import { Box, Heading, Button, ResponsiveContext } from "grommet";
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

  const sliceKeys = (keyArray, size) => {
    if (keyArray.length > 1) {
      if (size === "small") {
        return [keyArray[0]];
      } else if (size === "medium") {
        return [keyArray[0], keyArray[1]];
      }
    }

    return keyArray;
  };

  return (
    <ResponsiveContext.Consumer>
      {(responsive) => (
        <Box direction='row' fill='vertical' gap='small' width='95%'>
          {sliceKeys(Object.keys(calendar), responsive).map((dateGroup) => (
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
                  onClick={() => openTaskForm(moment(dateGroup))}
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
                {calendar[dateGroup].map((task) => (
                  <TaskCard key={task._id} task={task} />
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
};

const mapStateToProps = (state) => ({
  calendar: state.list.calendar,
  loading: state.loading.loading,
});

export default connect(mapStateToProps, { toggleCreateTaskForm })(
  DashBoardDayView
);
