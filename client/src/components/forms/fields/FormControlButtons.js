import React from "react";
import { Box, Button } from "grommet";

const FormControlButtons = ({ isUpdate, closeBehavior, submitOnly }) => (
  <Box direction="row" justify="around" margin={{ top: "medium" }}>
    {!submitOnly &&
      (isUpdate ? (
        <Button label="Cancel" onClick={closeBehavior} />
      ) : (
        <Button type="reset" label="Reset" />
      ))}

    <Button type="submit" label={isUpdate ? "Update" : "Create"} primary />
  </Box>
);

export default FormControlButtons;
