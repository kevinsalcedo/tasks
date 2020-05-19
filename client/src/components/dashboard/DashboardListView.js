import React from "react";
import { connect } from "react-redux";
import { toggleCreateTaskForm } from "../../actions/dashboard";
import { Box, Heading, Button } from "grommet";
import { Add } from "grommet-icons";
import Spinner from "../layout/Spinner";
import TaskCard from "../layout/containers/TaskCard";

const DashboardListView = ({
  lists,
  selectedList,
  tasks,
  loading,
  toggleCreateTaskForm,
}) => {
  const list = selectedList
    ? lists.find((list) => list._id === selectedList).name
    : "All Lists";

  if (loading) {
    return <Spinner />;
  }
  return (
    <Box fill='vertical' width='80%'>
      <Box align='center' direction='row'>
        <Heading level='3'>{list}</Heading>
        <Button
          icon={<Add />}
          hoverIndicator
          onClick={() => toggleCreateTaskForm(true)}
        />
      </Box>
      <Box overflow='auto'>
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  lists: state.list.lists,
  selectedList: state.list.selectedList,
  tasks: state.list.tasks,
  loading: state.loading.loading,
});

export default connect(mapStateToProps, { toggleCreateTaskForm })(
  DashboardListView
);
