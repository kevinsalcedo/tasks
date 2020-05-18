import React from "react";
import { connect } from "react-redux";
import { Button, Box, Heading } from "grommet";
import PropTypes from "prop-types";
import ContainerPane from "../layout/containers/ContainerPane";
import TaskCard from "../layout/containers/TaskCard";
import { loadTasksView, loadLists } from "../../actions/list";
import moment from "moment";
import { Add } from "grommet-icons";
import Spinner from "../layout/Spinner";
import CreateTaskForm from "../forms/CreateTaskForm";
import DeleteTaskForm from "../forms/DeleteTaskForm";
import { toggleCreateTaskForm } from "../../actions/dashboard";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calendar: {},
      dueDate: moment(),
    };
  }

  // // On loading the dashboard, default load tasks for the year
  componentDidMount() {
    const { loadLists } = this.props;
    // Load lists for the sidebar
    loadLists();

    // Load all tasks by default
    this.updateTasksView();
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

  // Update the view
  // When in list view, load all tasks
  // When in calendar, filter on the selected start date
  updateTasksView = () => {
    const { calendarStart, selectedList, view, loadTasksView } = this.props;
    if (view === "task") {
      loadTasksView(selectedList);
    } else {
      loadTasksView(selectedList, calendarStart);
    }
    this.setState({ dueDate: moment() });
  };

  // Render all tasks in a list view
  renderListView = () => {
    const { lists, selectedList, tasks, loading } = this.props;
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
            onClick={() => this.openTaskForm(moment())}
          />
        </Box>
        <Box gap='small' fill overflow='auto'>
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </Box>
      </Box>
    );
  };

  // Render tasks in a day by day calendar view
  renderDayView = () => {
    const { calendar, loading } = this.props;
    if (loading) {
      return <Spinner />;
    }

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
                onClick={() => this.openTaskForm(moment(dateGroup))}
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

  openTaskForm = (date) => {
    const { toggleCreateTaskForm } = this.props;
    if (date) {
      this.setState({ dueDate: date }, () => toggleCreateTaskForm(true));
    }
  };

  render() {
    const { view, createTaskOpen, deleteTaskOpen } = this.props;
    const { dueDate } = this.state;

    return (
      <ContainerPane justify='start' pad='medium'>
        {view === "calendar" ? this.renderDayView() : this.renderListView()}
        {createTaskOpen && <CreateTaskForm dueDate={dueDate} />}
        {deleteTaskOpen && <DeleteTaskForm />}
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
});

export default connect(mapStateToProps, {
  loadTasksView,
  loadLists,
  toggleCreateTaskForm,
})(Dashboard);
