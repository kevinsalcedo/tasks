import React from "react";
import { connect } from "react-redux";
import { toggleCreateTaskForm } from "../../actions/dashboard";
import { Box, Button } from "grommet";
import { Add } from "grommet-icons";
import Spinner from "../layout/Spinner";
import TaskCard from "../layout/containers/TaskCard";
import { loadTasksView } from "../../actions/list";

class DashboardListView extends React.Component {
  componentDidMount() {
    const { selectedList, loadTasksView } = this.props;
    loadTasksView(selectedList);
  }

  componentDidUpdate(prevProps) {
    const { selectedList, loadTasksView } = this.props;
    if (prevProps.selectedList !== selectedList) {
      loadTasksView(selectedList);
    }
  }

  render() {
    const { loading, tasks, toggleCreateTaskForm } = this.props;
    return (
      <Box fill='vertical' width='80%'>
        <Box align='center' direction='row'>
          <Button
            label='Add Task'
            icon={<Add />}
            reverse
            hoverIndicator
            onClick={() => toggleCreateTaskForm(true)}
          />
        </Box>
        <Box overflow='auto'>
          {loading ? (
            <Spinner />
          ) : (
            tasks.map((task) => <TaskCard key={task._id} task={task} />)
          )}
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  lists: state.list.lists,
  selectedList: state.list.selectedList,
  tasks: state.list.tasks,
  loading: state.loading.loading,
});

export default connect(mapStateToProps, {
  toggleCreateTaskForm,
  loadTasksView,
})(DashboardListView);
