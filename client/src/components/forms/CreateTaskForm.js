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
  const selectOptions = [];
  lists.map((item) =>
    selectOptions.push({ label: item.name, value: item._id })
  );
  const [name, setName] = useState(task ? task.name : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [taskList, setTaskList] = useState(
    task
      ? task.taskList._id
      : selectedList
      ? selectedList
      : lists.length > 0
      ? selectOptions[0].value
      : ""
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

  const onSubmit = async (e) => {
    e.preventDefault();
    let body = {};
    // Check for field changes
    // TODO - move all these comparisons into a separate utility file
    if (task) {
      if (task.name !== name) {
        body.name = name;
      }
      if (task.description !== description) {
        body.description = description;
      }
      if (task.taskList._id !== taskList) {
        body.taskList = taskList;
      }
      if (
        (task.startDate &&
          (startDate === null ||
            !moment(task.startDate).isSame(startDate, "day"))) ||
        (!task.startDate && startDate)
      ) {
        body.startDate = startDate;
      }
      if (task.backlog && endDate !== null) {
        body.backlog = false;
        body.endDate = endDate;
      } else if (!task.backlog) {
        if (endDate === null) {
          body.backlog = true;
          body.endDate = endDate;
        } else if (!moment(task.endDate).isSame(endDate, "day")) {
          body.endDate = endDate;
        }
      }

      updateTask(task._id, body);
    } else {
      if (name) {
        body.name = name;
      }
      if (description) {
        body.description = description;
      }
      if (taskList) {
        body.taskList = taskList;
      }
      if (startDate) {
        body.startDate = startDate;
      }
      if (endDate) {
        body.endDate = endDate;
        body.backlog = false;
      } else {
        body.backlog = true;
      }
      createTask(body);
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
            setTaskList("");
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
            value={taskList}
            onChange={setTaskList}
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
