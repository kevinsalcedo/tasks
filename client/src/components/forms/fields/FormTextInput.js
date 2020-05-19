import React from "react";
import { Box, FormField, Text, TextInput } from "grommet";

const FormTextInput = ({
  label,
  name,
  required,
  placeholder,
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
      <TextInput
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </FormField>
  );
};

export default FormTextInput;
