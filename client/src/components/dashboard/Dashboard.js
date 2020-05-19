import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ContainerPane from "../layout/containers/ContainerPane";
import { loadTasksView, loadLists, loadBacklogTasks } from "../../actions/list";
import moment from "moment";
import CreateTaskForm from "../forms/CreateTaskForm";
import DeleteTaskForm from "../forms/DeleteTaskForm";
import { toggleCreateTaskForm } from "../../actions/dashboard";
import CreateListForm from "../forms/CreateListForm";
import DashboardDayView from "./DashBoardDayView";
import DashboardListView from "./DashboardListView";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dueDate: moment(),
    };
  }

  // // On loading the dashboard, default load tasks for the year
  componentDidMount() {
    const { loadLists, loadBacklogTasks } = this.props;
    // Load lists for the sidebar
    loadLists();

    // Load all non-backlog tasks by default
    this.updateTasksView();

    // Load backlog
    loadBacklogTasks();
  }

  // When selection options are updated, make the new api call
  componentDidUpdate(prevProps) {
    const { view, calendarStart, selectedList } = this.props;
    if (
      prevProps.view !== view ||
      prevProps.calendarStart !== calendarStart ||
      prevProps.selectedList !== selectedList
    ) {
      this.updateTasksView();
    }
  }

  updateTasksView = () => {
    const { calendarStart, selectedList, view, loadTasksView } = this.props;
    if (view === "task") {
      loadTasksView(selectedList);
    } else {
      loadTasksView(selectedList, calendarStart);
    }
    this.setState({ dueDate: moment() });
  };

  updateDueDate = (date, callback) => {
    this.setState({ dueDate: date }, () => callback());
  };

  render() {
    const { view, createTaskOpen, deleteTaskOpen, createListOpen } = this.props;
    const { dueDate } = this.state;

    return (
      <ContainerPane justify='start' pad='medium'>
        {view === "calendar" ? (
          <DashboardDayView onChangeDate={this.updateDueDate} />
        ) : (
          <DashboardListView />
        )}
        {createTaskOpen && <CreateTaskForm dueDate={dueDate} />}
        {deleteTaskOpen && <DeleteTaskForm />}
        {createListOpen && <CreateListForm />}
      </ContainerPane>
    );
  }
}

Dashboard.propTypes = {
  selectedList: PropTypes.string,
  lists: PropTypes.array,
  tasks: PropTypes.array,
  calendar: PropTypes.object,
  calendarStart: PropTypes.string,
  view: PropTypes.string,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  selectedList: state.list.selectedList,
  lists: state.list.lists,
  tasks: state.list.tasks,
  calendar: state.list.calendar,
  calendarStart: state.dashboard.calendarStart,
  view: state.dashboard.view,
  loading: state.loading.loading,
  createTaskOpen: state.dashboard.createTaskOpen,
  deleteTaskOpen: state.dashboard.deleteTaskOpen,
  createListOpen: state.dashboard.createListOpen,
});

export default connect(mapStateToProps, {
  loadTasksView,
  loadLists,
  toggleCreateTaskForm,
  loadBacklogTasks,
})(Dashboard);
