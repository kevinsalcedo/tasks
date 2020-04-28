import React from "react";
import { Box } from "grommet";

const TaskCard = (props) => (
  <Box pad="medium" background="lightgrey" elevation="small" round>
    {props.children}
  </Box>
);

export default TaskCard;
