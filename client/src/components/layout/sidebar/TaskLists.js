import React from "react";
import { connect } from "react-redux";
import { loadLists, selectList } from "../../../actions/list";
import { Accordion, AccordionPanel, Box, Button, Text } from "grommet";
import moment from "moment";

class TaskLists extends React.Component {
  // When the sidebar is loaded, then populate the lists
  // Get all the tasks for the next three (four?) days
  componentDidMount() {
    const start = moment().utc().startOf("day").format();
    const end = moment(start).utc().add(2, "days").format();
    this.props.loadLists(start, end);
  }

  render() {
    const { selectedList, lists, loading } = this.props;
    if (!loading) {
      if (lists.length === 0) {
        return <Text>You don't have any lists!</Text>;
      }
      return (
        <Accordion>
          <AccordionPanel label="My Lists" pad="small">
            <Box pad="small">
              <Button
                label="All"
                active={!selectedList}
                primary
                onClick={() => this.props.selectList()}
              />
            </Box>
            {lists.map((list) => (
              <Box pad="small" key={list._id}>
                <Button
                  color={list.color}
                  label={list.name}
                  active={selectedList === list._id}
                  onClick={() => this.props.selectList(list._id)}
                  primary
                />
              </Box>
            ))}
          </AccordionPanel>
        </Accordion>
      );
    }
    return <Text>Loading...</Text>;
  }
}

const mapStateToProps = (state) => ({
  selectedList: state.list.selectedList,
  lists: state.list.lists,
  tasks: state.list.tasks,
  loading: state.list.loading,
});

export default connect(mapStateToProps, { loadLists, selectList })(TaskLists);
