import React, { useState } from "react";
import { Box, Button, Collapsible, ResponsiveContext } from "grommet";
import { Menu } from "grommet-icons";
import { Sidebar } from "./Sidebar";

const CollapsibleSidebar = (props) => {
  const [open, toggleOpen] = useState(false);
  return (
    <Box>
      <Button icon={<Menu />} onClick={() => toggleOpen(!open)} />
      <Collapsible direction='horizontal' open={open}>
        <Sidebar />
      </Collapsible>
    </Box>
  );
};

export default CollapsibleSidebar;
