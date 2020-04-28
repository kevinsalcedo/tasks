import React from "react";
import { Box } from "grommet";

const ContainerPane = (props) => {
  return (
    <Box
      background='white'
      align='center'
      justify='center'
      fill
      round='medium'
      elevation='small'
      {...props}
    >
      {props.children}
    </Box>
  );
};

export default ContainerPane;
