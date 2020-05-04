import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Button, Box, Text, Heading } from "grommet";
import PropTypes from "prop-types";
import ContainerPane from "../layout/containers/ContainerPane";
import TaskCard from "../layout/containers/TaskCard";
import { loadTasks, loadLists } from "../../actions/list";
import moment from "moment";
import { Add } from "grommet-icons";
import CreateTaskModal from "../forms/CreateTaskModal";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  openModal = () => this.setState({ modalOpen: true });
  closeModal = () => this.setState({ modalOpen: false });
  // // On loading the dashboard, default load tasks for the year
  componentDidMount() {
    const { loadLists, loadTasks, view } = this.props;
    const start = moment().format();
    // Load lists for the sidebar
    loadLists();

    // Load all tasks by default
    loadTasks(null, start, view);
  }

  // When selection options are updated, make the new api call
  componentDidUpdate(prevProps) {
    const { view, calendarStart, selectedList, loadTasks } = this.props;
    if (
      prevProps.view !== view ||
      prevProps.calendarStart !== calendarStart ||
      prevProps.selectedList !== selectedList
    ) {
      loadTasks(selectedList, calendarStart, view);
    }
  }

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
          <Button icon={<Add />} hoverIndicator onClick={this.openModal} />
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
    // debugger;
    const { loading, calendar } = this.props;
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
                onClick={this.openModal}
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
              {calendar[dateGroup].map((item) => (
                <TaskCard key={item._id} task={item} />
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    );
  };

  render() {
    const { view } = this.props;
    const { modalOpen } = this.state;

    return (
      <ContainerPane justify='start' pad='medium'>
        {view === "calendar" ? this.renderDayView() : this.renderListView()}
        {modalOpen && <CreateTaskModal onClose={this.closeModal} />}
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

export default connect(mapStateToProps, { loadTasks, loadLists })(Dashboard);
