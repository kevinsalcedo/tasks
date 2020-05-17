import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Box,
  Button,
  Heading,
  Form,
  FormField,
  Layer,
  Select,
  TextInput,
  TextArea,
} from "grommet";
import moment from "moment";
import DatePicker from "./DatePicker";
import { createTask, updateTask } from "../../actions/list";
import { Close } from "grommet-icons";

const CreateTaskForm = ({
  dueDate,
  lists,
  closeForm,
  task,
  createTask,
  updateTask,
}) => {
  const [name, setName] = useState(task ? task.name : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [list, setList] = useState(task ? task.taskList._id : "");
  const [startDate, setStartDate] = useState(
    task && task.startDate ? moment(task.startDate) : null
  );
  const [endDate, setEndDate] = useState(
    task && task.endDate && !task.backlog ? moment(task.endDate) : dueDate
  );

  const selectOptions = [];
  lists.map((item) =>
    selectOptions.push({ label: item.name, value: item._id })
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    // Client side validation here
    const body = {};
    if (name) body.name = name;
    if (description) body.description = description;
    if (list) body.list = list;
    if (startDate) body.startDate = startDate;
    if (endDate) body.endDate = endDate;

    if (task) {
      // console.log(list);
      updateTask(task._id, name, description, list, startDate, endDate);
    } else {
      createTask(name, description, list, startDate, endDate);
    }
    closeForm();
  };

  return (
    <Layer position='center' modal onClickOutside={closeForm} onEsc={closeForm}>
      <Box pad='medium' gap='small' width='medium'>
        <Box direction='row' justify='between' align='center'>
          <Heading level={3} margin='none'>
            {task ? "Update Task" : "New Task"}
          </Heading>

          <Button icon={<Close />} onClick={closeForm} />
        </Box>
        <Form
          onReset={() => {
            setName("");
            setDescription("");
            setList("");
            setStartDate(null);
            setEndDate(dueDate);
          }}
          onSubmit={(e) => onSubmit(e)}
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
              placeholder="What's this task about?"
              name='description'
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </FormField>
          <FormField label='List' name='list'>
            <Select
              name='list'
              options={selectOptions}
              labelKey='label'
              valueKey={{ key: "value", reduce: true }}
              value={list}
              onChange={({ value: nextValue }) => setList(nextValue)}
            />
          </FormField>
          <Box direction='row' align='center' justify='around'>
            <FormField label='Start Date' name='startDate'>
              <DatePicker
                name='startDate'
                value={startDate}
                onChange={(event) => setStartDate(event)}
              />
            </FormField>
            <FormField label='End Date' name='endDate'>
              <DatePicker
                name='endDate'
                value={endDate}
                onChange={(event) => setEndDate(event)}
              />
            </FormField>
          </Box>
          <Box direction='row' justify='around' margin={{ top: "medium" }}>
            <Button type='reset' label='Reset' />
            <Button type='submit' label={task ? "Update" : "Create"} primary />
          </Box>
        </Form>
      </Box>
    </Layer>
  );
};

const mapStateToProps = (state) => ({
  lists: state.list.lists,
});

export default connect(mapStateToProps, { createTask, updateTask })(
  CreateTaskForm
);
