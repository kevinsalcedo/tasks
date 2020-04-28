import React from "react";
import { connect } from "react-redux";
import { Box, Text, Heading, List } from "grommet";
import PropTypes from "prop-types";
import ContainerPane from "../layout/ContainerPane";
import TaskCard from "../layout/TaskCard";
import { loadTasks, loadLists } from "../../actions/list";
import moment from "moment";

class Dashboard extends React.Component {
  // On loading the dashboard, default load tasks for the year
  componentDidMount() {
    const { loadLists, loadTasks, view } = this.props;
    const start = moment().startOf("year").format();
    // Load lists for the sidebar
    loadLists();

    // Load all tasks by default
    loadTasks(null, start, view);
  }

  componentDidUpdate(prevProps) {
    const { view, startDate, selectedList, loadTasks } = this.props;
    if (
      prevProps.view !== view ||
      prevProps.startDate !== startDate ||
      prevProps.selectedList !== selectedList
    ) {
      loadTasks(selectedList, startDate, view);
    }
  }

  renderListView = (tasks) => {
    const list = [];

    Object.values(tasks).map((group) => group.map((task) => list.push(task)));
    return (
      <Box gap='small' fill>
        {list.map((task) => (
          <TaskCard key={task._id} color={task.taskList.color}>
            {task.name}
          </TaskCard>
        ))}
      </Box>
    );
  };

  renderDayView = (tasks) => (
    <Box direction='row' gap='small' fill>
      {Object.keys(tasks).map((dateGroup) => (
        <Box
          key={dateGroup}
          gap='small'
          align='center'
          fill
          background='light-4'
          elevation='small'
        >
          <Heading level='4'>{moment(dateGroup).format("MMMM Do")}</Heading>
          <Box gap='small'>
            {tasks[dateGroup].map((item) => (
              <TaskCard key={item._id} color={item.taskList.color}>
                {item.name}
              </TaskCard>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );

  render() {
    const { tasks, view } = this.props;
    return (
      <ContainerPane justify='start' pad='medium'>
        {view === "calendar"
          ? this.renderDayView(tasks)
          : this.renderListView(tasks)}
      </ContainerPane>
    );
  }
}

Dashboard.propTypes = {
  selectedList: PropTypes.string,
  tasks: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  startDate: PropTypes.string,
  view: PropTypes.string,
};

const mapStateToProps = (state) => ({
  selectedList: state.list.selectedList,
  tasks: state.list.tasks,
  loading: state.list.loading,
  startDate: state.list.startDate,
  view: state.dashboard.view,
});

export default connect(mapStateToProps, { loadTasks, loadLists })(Dashboard);
