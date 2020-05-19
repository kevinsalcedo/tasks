import React from "react";
import { Box } from "grommet";
import { CirclePicker } from "react-color";

const FormColorPicker = ({ label, name, color, onChange }) => {
  return (
    <Box align='center' justify='center' pad='small'>
      <CirclePicker
        name={name}
        color={color}
        onChangeComplete={(newColor) => onChange(newColor.hex)}
      />
    </Box>
  );
};

export default FormColorPicker;
