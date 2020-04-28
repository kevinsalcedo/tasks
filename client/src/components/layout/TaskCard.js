import React from "react";
import { Box, Button, CheckBox } from "grommet";
import { MoreVertical } from "grommet-icons";

const TaskCard = (props) => (
  <Box
    direction='row'
    pad='medium'
    background='light-1'
    elevation='small'
    width='medium'
    gap='small'
    justify='between'
    align='center'
    border={{
      color: props.color,
      side: "left",
      size: "large",
      style: "solid",
    }}
    {...props}
  >
    <CheckBox background='yellow' />
    <Box>{props.children}</Box>
    <Button icon={<MoreVertical />} />
  </Box>
);

export default TaskCard;
