import React, { useState } from "react";
import { Box, Button, FormField, TextInput } from "grommet";
import { View, Hide } from "grommet-icons";

const FormPasswordInput = ({
  label,
  name,
  required,
  placeholder,
  value,
  onChange,
}) => {
  const [reveal, setReveal] = useState(false);
  return (
    <FormField label={label} name={name} required={required}>
      <Box direction='row' align='center'>
        <TextInput
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          plain
          type={reveal ? "text" : "password"}
        />
        <Button
          icon={reveal ? <View size='medium' /> : <Hide size='medium' />}
          onClick={() => setReveal(!reveal)}
        />
      </Box>
    </FormField>
  );
};

export default FormPasswordInput;
