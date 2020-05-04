import React from "react";
import { connect } from "react-redux";
import { selectList } from "../../../actions/list";
import { Accordion, AccordionPanel, Box, Button } from "grommet";
import { Add } from "grommet-icons";

class TaskLists extends React.Component {
  render() {
    const { selectedList, lists } = this.props;
    return (
      <Accordion>
        <AccordionPanel label='My Lists' pad='small' active>
          <Box pad='small'>
            <Button
              label='All'
              active={!selectedList}
              primary
              onClick={() => this.props.selectList(null)}
            />
          </Box>
          {lists.map((list) => (
            <Box pad='small' key={list._id}>
              <Button
                color={list.color}
                label={list.name}
                active={selectedList === list._id}
                onClick={() => this.props.selectList(list._id)}
                primary
              />
            </Box>
          ))}
          <Box pad='small'>
            <Button icon={<Add />} label='New List' onClick={this.openModal} />
          </Box>
        </AccordionPanel>
      </Accordion>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedList: state.list.selectedList,
  lists: state.list.lists,
  tasks: state.list.tasks,
});

export default connect(mapStateToProps, { selectList })(TaskLists);
