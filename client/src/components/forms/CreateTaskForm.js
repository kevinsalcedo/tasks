import React, { useState } from "react";
import { connect } from "react-redux";
import { Box, Button, Heading, Form, Layer } from "grommet";
import FormTextInput from "./fields/FormTextInput";
import FormTextArea from "./fields/FormTextArea";
import FormSelect from "./fields/FormSelect";
import FormDatePicker from "./fields/FormDatePicker";
import moment from "moment";
import { createTask, updateTask, selectTask } from "../../actions/list";
import { toggleCreateTaskForm } from "../../actions/dashboard";
import { Close } from "grommet-icons";
import FormControlButtons from "./fields/FormControlButtons";

const CreateTaskForm = ({
  dueDate = moment(),
  lists,
  task,
  createTask,
  updateTask,
  toggleCreateTaskForm,
  selectTask,
  selectedList,
}) => {
  const [name, setName] = useState(task ? task.name : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [list, setList] = useState(
    task ? task.taskList._id : selectedList ? selectedList : ""
  );
  const [startDate, setStartDate] = useState(
    task && task.startDate ? moment(task.startDate) : null
  );
  const [endDate, setEndDate] = useState(
    task && task.endDate
      ? task.backlog
        ? null
        : moment(task.endDate)
      : dueDate
  );

  const selectOptions = [];
  lists.map((item) =>
    selectOptions.push({ label: item.name, value: item._id })
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    // Client side validation here
    if (task) {
      updateTask(task._id, name, description, list, startDate, endDate);
    } else {
      createTask(name, description, list, startDate, endDate);
    }
    closeForm();
  };

  const closeForm = () => {
    selectTask(null);
    toggleCreateTaskForm(false);
  };

  return (
    <Layer position='center' modal onClickOutside={closeForm} onEsc={closeForm}>
      <Box pad='medium' gap='small' width='medium' fill='horizontal'>
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
            placeholder="What's this task about?"
            value={description}
            onChange={setDescription}
          />
          <FormSelect
            label='List'
            name='list'
            placeholder='Please select a list'
            options={selectOptions}
            value={list}
            onChange={setList}
            required
          />

          <Box direction='row' align='center' justify='around'>
            <FormDatePicker
              label='Start Date'
              name='startDate'
              value={startDate}
              onChange={setStartDate}
            />
            <FormDatePicker
              label='Due Date'
              name='endDate'
              value={endDate}
              onChange={setEndDate}
            />
          </Box>
          <FormControlButtons isUpdate={task} closeBehavior={closeForm} />
        </Form>
      </Box>
    </Layer>
  );
};

const mapStateToProps = (state) => ({
  lists: state.list.lists,
  task: state.list.selectedTask,
  selectedList: state.list.selectedList,
});

export default connect(mapStateToProps, {
  createTask,
  updateTask,
  toggleCreateTaskForm,
  selectTask,
})(CreateTaskForm);
