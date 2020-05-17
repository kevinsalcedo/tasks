import React from "react";
import { connect } from "react-redux";
import { Button, Box, Text, Heading } from "grommet";
import PropTypes from "prop-types";
import ContainerPane from "../layout/containers/ContainerPane";
import TaskCard from "../layout/containers/TaskCard";
import {
  loadTasksView,
  loadLists,
  createTask,
  updateTask,
} from "../../actions/list";
import moment from "moment";
import { Add } from "grommet-icons";
import CreateTaskForm from "../forms/CreateTaskForm";
import DeleteTaskForm from "../forms/DeleteTaskForm";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createModalOpen: false,
      deleteModalOpen: false,
      taskToDelete: null,
      calendar: {},
      dueDate: moment(),
      taskToUpdate: null,
    };
  }

  openCreateModal = (dueDate, task) =>
    this.setState({
      createModalOpen: true,
      dueDate: moment(dueDate),
      taskToUpdate: task,
    });
  closeCreateModal = () =>
    this.setState({ createModalOpen: false, taskToUpdate: null });
  openDeleteModal = (task) =>
    this.setState({ deleteModalOpen: true, taskToDelete: task });
  closeDeleteModal = () =>
    this.setState({ deleteModalOpen: false, taskToDelete: null });

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
      console.log("Update list view");
      loadTasksView(selectedList);
    } else {
      console.log("Update calendar");
      loadTasksView(selectedList, calendarStart);
      // this.generateCalendar();
    }
    this.setState({ dueDate: moment() });
  };

  generateCalendar = () => {
    const { calendarStart, tasks, loading } = this.props;

    if (!loading) {
      const calendar = {};
      const start = moment(calendarStart);
      const end = moment(calendarStart).add(2, "days").endOf("day");
      let curr = start;
      while (!curr.isAfter(end, "day")) {
        calendar[curr.startOf("day").format()] = [];
        curr = curr.add(1, "days");
      }
      debugger;
      tasks.forEach((task) => {
        const create = task.endDate
          ? moment(task.endDate)
          : moment(task.createDate);
        calendar[create.startOf("day").format()].push(task);
      });
      this.setState({ calendar });
    }
  };

  // Render all tasks in a list view
  renderListView = () => {
    const { lists, selectedList, tasks } = this.props;
    const list = selectedList
      ? lists.find((list) => list._id === selectedList).name
      : "All Lists";

    return (
      <Box fill='vertical' width='80%'>
        <Box align='center' direction='row'>
          <Heading level='3'>{list}</Heading>
          <Button
            icon={<Add />}
            hoverIndicator
            onClick={() => this.openCreateModal(moment().format())}
          />
        </Box>
        <Box gap='small' fill overflow='auto'>
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDeleteOpen={() => this.openDeleteModal(task)}
              onDeleteClose={this.closeDeleteModal}
              onUpdateOpen={() => this.openCreateModal(moment().format(), task)}
              onUpdateClose={this.closeCreateModal}
            />
          ))}
        </Box>
      </Box>
    );
  };

  // Render tasks in a day by day calendar view
  renderDayView = () => {
    // debugger;
    const { loading } = this.props;
    const { calendar } = this.state;
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
                onClick={() => this.openCreateModal(dateGroup)}
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
                <TaskCard
                  key={task._id}
                  task={task}
                  onDeleteOpen={() => this.openDeleteModal(task)}
                  onDeleteClose={this.closeDeleteModal}
                  onUpdateOpen={() => this.openCreateModal(dateGroup, task)}
                  onUpdateClose={this.closeCreateModal}
                />
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    );
  };

  render() {
    const { view } = this.props;
    const {
      createModalOpen,
      deleteModalOpen,
      taskToDelete,
      dueDate,
      taskToUpdate,
    } = this.state;

    return (
      <ContainerPane justify='start' pad='medium'>
        {view === "calendar" ? this.renderDayView() : this.renderListView()}
        {createModalOpen && (
          <CreateTaskForm
            dueDate={dueDate}
            task={taskToUpdate}
            closeForm={this.closeCreateModal}
          />
        )}
        {deleteModalOpen && (
          <DeleteTaskForm
            closeForm={this.closeDeleteModal}
            taskToDelete={taskToDelete}
          />
        )}
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
});

export default connect(mapStateToProps, {
  loadTasksView,
  loadLists,
  createTask,
})(Dashboard);
