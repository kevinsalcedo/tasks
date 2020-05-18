import React, { useState } from "react";
import { connect } from "react-redux";
import { toggleCreateListForm } from "../../actions/dashboard";
import {
  Box,
  Button,
  Layer,
  Heading,
  Form,
  FormField,
  TextInput,
  TextArea,
} from "grommet";
import { CirclePicker } from "react-color";
import { Close } from "grommet-icons";

const CreateListForm = ({ taskList, toggleCreateListForm }) => {
  const [name, setName] = useState(taskList ? taskList.name : "");
  const [description, setDescription] = useState(
    taskList ? taskList.description : ""
  );
  const [color, setColor] = useState(taskList ? taskList.color : "");

  const onSubmit = async (e) => {
    e.preventDefault();
    // Client side validation here
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
          onReset={() => {
            setName("");
            setDescription("");
            setColor("");
          }}
        >
          <FormField label='Name' name='name'>
            <TextInput
              placeholder='Name'
              name='name'
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </FormField>
          <FormField label='Description' name='description'>
            <TextArea
              placeholder="What's this list about?"
              name='description'
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </FormField>
          <FormField label='Color' name='color'>
            <Box align='center' justify='center' pad='small'>
              <CirclePicker
                name='color'
                color={color}
                onChangeComplete={(color) => setColor(color.hex)}
              />
            </Box>
          </FormField>
          <Box direction='row' justify='around' margin={{ top: "medium" }}>
            {taskList ? (
              <Button label='Cancel' onClick={closeForm} />
            ) : (
              <Button type='reset' label='Reset' />
            )}
            <Button
              type='submit'
              label={taskList ? "Update" : "Create"}
              primary
            />
          </Box>
        </Form>
      </Box>
    </Layer>
  );
};

export default connect(null, { toggleCreateListForm })(CreateListForm);
