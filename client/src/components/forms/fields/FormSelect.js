import React from "react";
import { Box, FormField, Text, Select } from "grommet";

const FormSelect = ({
  label,
  name,
  required,
  placeholder,
  options,
  value,
  onChange,
}) => {
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
      <Select
        name={name}
        options={options}
        placeholder={placeholder}
        labelKey='label'
        valueKey={{ key: "value", reduce: true }}
        value={value}
        onChange={({ value: nextValue }) => onChange(nextValue)}
      />
    </FormField>
  );
};

export default FormSelect;
