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
import DatePicker from "./DatePicker";
import { createTask } from "../../actions/list";
import { Close, FormSchedule } from "grommet-icons";

const CreateTaskForm = ({ defaultDueDate, lists, closeForm, createTask }) => {
  const initialState = {
    name: "",
    description: "",
    list: "",
    startDate: "",
    endDate: defaultDueDate,
  };
  const [formData, setFormData] = useState(initialState);

  const { name, description, list, startDate, endDate } = formData;

  const selectOptions = [];
  lists.map((item) =>
    selectOptions.push({ label: item.name, value: item._id })
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    // Client side validation here
    // Do the submit action here
    createTask(name, description, list, startDate, endDate);
    console.log(endDate);
    closeForm();
  };

  const onChange = (nextValue) => {
    setFormData(nextValue);
  };

  const onDateChange = (date, time) => {
    const combinedDate = `${date} ${time}`;
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
          value={formData}
          onChange={onChange}
          onReset={() => setFormData(initialState)}
          onSubmit={(e) => onSubmit(e)}
        >
          <FormField label='Name' name='name'>
            <TextInput placeholder='Name' name='name' />
          </FormField>
          <FormField label='Description' name='description'>
            <TextArea
              placeholder="What's this task about?"
              name='description'
            />
          </FormField>
          <FormField label='List' name='list'>
            <Select
              name='list'
              options={selectOptions}
              labelKey='label'
              valueKey='value'
            />
          </FormField>
          {/* <FormField label='Start Date' name='startDate'>
          <DatePicker name='startDate' currDate={formData.startDate} />
        </FormField> */}
          <FormField label='End Date' name='endDate'>
            <DatePicker
              name='endDate'
              currDate={formData.endDate}
              onDateChange={onDateChange}
            />
          </FormField>
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
