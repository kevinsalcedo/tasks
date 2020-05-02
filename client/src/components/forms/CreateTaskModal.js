import React from "react";
import {
  Layer,
  Box,
  Heading,
  Form,
  FormField,
  Select,
  TextInput,
  TextArea,
} from "grommet";
import { connect } from "react-redux";

const CreateTaskModal = ({ lists, onClose }) => {
  return (
    <Layer position="center" modal onClickOutside={onClose} onEsc={onClose}>
      <Box pad="medium" gap="small" width="medium">
        <Heading level={3} margin="none">
          New Task
        </Heading>
        <Form>
          <FormField label="Name">
            <TextInput placeholder="Name" />
          </FormField>
          <FormField label="Description">
            <TextArea placeholder="What's this task about?" />
          </FormField>
          <FormField label="List">
            <Select options={lists.map((item) => item.name)} />
          </FormField>
        </Form>
      </Box>
    </Layer>
  );
};

const mapStateToProps = (state) => ({
  lists: state.list.lists,
});

export default connect(mapStateToProps)(CreateTaskModal);
