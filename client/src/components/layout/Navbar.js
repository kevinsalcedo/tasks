import React from "react";
import { connect } from "react-redux";
import { Menu as MenuIcon } from "grommet-icons";
import { Box, Header, Button, Menu } from "grommet";
import DisplayButtonGroup from "../layout/sidebar/DisplayButtonGroup";
import {
  openSidebar,
  toggleCreateTaskForm,
  toggleCreateListForm,
} from "../../actions/dashboard";

const Navbar = ({
  isAuthenticated,
  sidebarOpen,
  toggleCreateTaskForm,
  toggleCreateListForm,
  openSidebar,
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
      <Box>
        <Menu
          label='Add New'
          items={[
            { label: "Task", onClick: () => toggleCreateTaskForm(true) },
            { label: "List", onClick: () => toggleCreateListForm(true) },
          ]}
        />
      </Box>
    </Header>
  );
};

const mapStateToProps = (state) => ({
  sidebarOpen: state.dashboard.sidebarOpen,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  openSidebar,
  toggleCreateTaskForm,
  toggleCreateListForm,
})(Navbar);
