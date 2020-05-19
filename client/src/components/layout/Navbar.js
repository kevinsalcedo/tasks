import React from "react";
import { connect } from "react-redux";
import { Menu as MenuIcon } from "grommet-icons";
import { Box, Header, Button, Menu } from "grommet";
import DisplayButtonGroup from "../layout/sidebar/DisplayButtonGroup";
import {
  openSidebar,
  openBacklog,
  toggleCreateTaskForm,
  toggleCreateListForm,
} from "../../actions/dashboard";

const Navbar = ({
  isAuthenticated,
  sidebarOpen,
  backlogOpen,
  toggleCreateTaskForm,
  toggleCreateListForm,
  openSidebar,
  openBacklog,
}) => {
  return (
    <Header pad='small' elevation='small' justify='between' direction='row'>
      <Box direction='row' align='center' gap='small'>
        <Button
          icon={<MenuIcon size='medium' />}
          onClick={() => openSidebar(!sidebarOpen)}
        />

        {isAuthenticated && <DisplayButtonGroup />}
      </Box>
      <Box direction='row' align='center' gap='small'>
        <Menu
          label='Add New'
          items={[
            { label: "Task", onClick: () => toggleCreateTaskForm(true) },
            { label: "List", onClick: () => toggleCreateListForm(true) },
          ]}
        />
        <Button
          icon={<MenuIcon size='medium' />}
          onClick={() => openBacklog(!backlogOpen)}
        />
      </Box>
    </Header>
  );
};

const mapStateToProps = (state) => ({
  sidebarOpen: state.dashboard.sidebarOpen,
  backlogOpen: state.dashboard.backlogOpen,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  openSidebar,
  openBacklog,
  toggleCreateTaskForm,
  toggleCreateListForm,
})(Navbar);
