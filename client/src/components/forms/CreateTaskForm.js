import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Box,
  Button,
  Calendar,
  Heading,
  Form,
  FormField,
  Layer,
  Select,
  TextInput,
  TextArea,
} from "grommet";
import DatePicker from "./DatePicker";
import { createTask } from "../../actions/list";
import { Close, FormSchedule } from "grommet-icons";

const CreateTaskForm = ({ defaultDueDate, lists, closeForm, createTask }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [list, setList] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(defaultDueDate);

  const selectOptions = [];
  lists.map((item) =>
    selectOptions.push({ label: item.name, value: item._id })
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    // Client side validation here
    createTask(name, description, list, startDate, endDate);
    closeForm();
  };

  return (
    <Layer position='center' modal onClickOutside={closeForm} onEsc={closeForm}>
      <Box pad='medium' gap='small' width='medium'>
        <Box direction='row' justify='between' align='center'>
          <Heading level={3} margin='none'>
            New Task
          </Heading>

          <Button icon={<Close />} onClick={closeForm} />
        </Box>
        <Form
          onReset={() => {
            setName("");
            setDescription("");
            setList("");
            setStartDate(null);
            setEndDate(defaultDueDate);
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
            <Button type='submit' label='Create' primary />
          </Box>
        </Form>
      </Box>
    </Layer>
  );
};

const mapStateToProps = (state) => ({
  lists: state.list.lists,
  defaultDueDate: state.dashboard.defaultDueDate,
});

export default connect(mapStateToProps, { createTask })(CreateTaskForm);
