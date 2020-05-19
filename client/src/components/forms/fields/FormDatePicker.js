import React from "react";
import { Box, FormField, Text } from "grommet";
import DatePicker from "./DatePicker";

const FormDatePicker = ({ label, name, required, value, onChange }) => {
  const renderLabel = () => {
    if (required) {
      return (
        <Box direction='row'>
          <Text>{label}</Text>
          <Text color='status-critical'>*</Text>
        </Box>
      );
    } else {
      return label;
    }
  };

  return (
    <FormField label={renderLabel()} name={name} required={required}>
      <DatePicker
        name={name}
        value={value}
        onChange={(event) => onChange(event)}
      />
    </FormField>
  );
};

export default FormDatePicker;
