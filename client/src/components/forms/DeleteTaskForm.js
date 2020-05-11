import React from "react";
import { connect } from "react-redux";

import { Box, Button, Layer, Text, Heading } from "grommet";
import { deleteTask } from "../../actions/list";

const DeleteTaskForm = ({ deleteTask, taskToDelete, closeForm }) => {
  const onClick = () => {
    deleteTask(taskToDelete._id, taskToDelete.taskList._id);
    closeForm();
  };
  return (
    <Layer position='center' modal onClickOutside={closeForm} onEsc={closeForm}>
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

export default connect(null, { deleteTask })(DeleteTaskForm);
