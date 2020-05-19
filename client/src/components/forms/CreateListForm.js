import React, { useState } from "react";
import { connect } from "react-redux";
import { toggleCreateListForm } from "../../actions/dashboard";
import { Box, Button, Layer, Heading, Form } from "grommet";
import FormTextInput from "./fields/FormTextInput";
import FormTextArea from "./fields/FormTextArea";
import { Close } from "grommet-icons";
import { createList } from "../../actions/list";
import FormColorPicker from "./fields/FormColorPicker";
import FormControlButtons from "./fields/FormControlButtons";

const CreateListForm = ({ taskList, toggleCreateListForm, createList }) => {
  const [name, setName] = useState(taskList ? taskList.name : "");
  const [description, setDescription] = useState(
    taskList ? taskList.description : ""
  );
  const [color, setColor] = useState(taskList ? taskList.color : "#f44336");

  const onSubmit = async (e) => {
    e.preventDefault();
    // Client side validation here
    const formValues = { name, description, color };

    createList(formValues);
    closeForm();
  };

  const closeForm = () => {
    toggleCreateListForm(false);
  };

  return (
    <Layer position='center' modal onClickOutside={closeForm} onEsc={closeForm}>
      <Box pad='medium' gap='small' width='medium' fill='horizontal'>
        <Box direction='row' justify='between' align='center'>
          <Heading level={3} margin='none'>
            {taskList ? "Update List" : "New List"}
          </Heading>
          <Button icon={<Close />} onClick={closeForm} />
        </Box>
        <Form
          onSubmit={onSubmit}
          onReset={() => {
            setName("");
            setDescription("");
            setColor("");
          }}
        >
          <FormTextInput
            label='Name'
            name='name'
            placeholder='Name'
            value={name}
            onChange={setName}
            required
          />
          <FormTextArea
            label='Description'
            name='description'
            placeholder='Description'
            value={description}
            onChange={setDescription}
          />
          <FormColorPicker name='color' color={color} onChange={setColor} />
          <FormControlButtons isUpdate={taskList} closeBehavior={closeForm} />
        </Form>
      </Box>
    </Layer>
  );
};

export default connect(null, { toggleCreateListForm, createList })(
  CreateListForm
);
