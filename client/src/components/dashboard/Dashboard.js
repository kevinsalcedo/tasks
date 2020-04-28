import React from "react";
import { connect } from "react-redux";
import { Box, Text, Heading } from "grommet";
import PropTypes from "prop-types";
import ContainerPane from "../layout/ContainerPane";
import TaskCard from "../layout/TaskCard";
import moment from "moment";

class Dashboard extends React.Component {
  componentDidMount() {}

  componentDidUpdate(prevProps) {}

  render() {
    const { tasks } = this.props;
    console.log(tasks);
    return (
      <ContainerPane justify="start" pad="medium">
        {/* <Box direction="row" gap="small" fill>
          {Object.keys(tasks).map((dateGroup) => (
            <Box
              key={dateGroup}
              gap="small"
              align="center"
              fill
              background="#aaaaaa"
              round
              elevation="small"
            >
              <Heading level="4">{moment(dateGroup).format("MMMM Do")}</Heading>
              <Box gap="small">
                {tasks[dateGroup].map((item) => (
                  <TaskCard key={item._id}>{item.name}</TaskCard>
                ))}
              </Box>
            </Box>
          ))}
        </Box> */}
      </ContainerPane>
    );
  }
}

Dashboard.propTypes = {
  selectedList: PropTypes.string,
  tasks: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
};

const mapStateToProps = (state) => ({
  selectedList: state.list.selectedList,
  tasks: state.list.tasks,
  loading: state.task.loading,
  startDate: state.list.startDate,
  endDate: state.list.endDate,
});

export default connect(mapStateToProps)(Dashboard);
