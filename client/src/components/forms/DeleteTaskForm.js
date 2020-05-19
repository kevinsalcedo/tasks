import React from "react";
import { connect } from "react-redux";

import { Box, Button, Layer, Text, Heading } from "grommet";
import { deleteTask, selectTask } from "../../actions/list";
import { toggleDeleteTaskForm } from "../../actions/dashboard";

const DeleteTaskForm = ({
  task,
  deleteTask,
  toggleDeleteTaskForm,
  selectTask,
}) => {
  const closeForm = () => {
    selectTask(null);
    toggleDeleteTaskForm(false);
  };

  const onClick = () => {
    deleteTask(task._id);
    closeForm();
  };

  return (
    <Layer
      position='center'
      modal
      onClickOutside={closeForm}
      onEsc={closeForm}
      responsive={false}
    >
      <Box pad='medium' round='small' gap='small' align='center'>
        <Heading level={3}>Confirmation</Heading>
        <Text>Are you sure you want to delete this task?</Text>
        <Box direction='row' gap='small'>
          <Button primary label='Cancel' onClick={closeForm} />
          <Button label='Delete' onClick={onClick} />
        </Box>
      </Box>
    </Layer>
  );
};

const mapStateToProps = (state) => ({
  task: state.list.selectedTask,
});

export default connect(mapStateToProps, {
  deleteTask,
  selectTask,
  toggleDeleteTaskForm,
})(DeleteTaskForm);
