import React from "react";
import { connect } from "react-redux";
import { Menu } from "grommet-icons";
import { Box, Header, Button } from "grommet";
import DisplayButtonGroup from "../layout/sidebar/DisplayButtonGroup";
import { openSidebar } from "../../actions/dashboard";

const Navbar = ({ isAuthenticated, sidebarOpen, openSidebar }) => {
  return (
    <Header pad='small' elevation='small'>
      <Box direction='row' align='center' gap='small'>
        <Button
          icon={<Menu size='medium' />}
          onClick={() => openSidebar(!sidebarOpen)}
        />

        {isAuthenticated && <DisplayButtonGroup />}
      </Box>
    </Header>
  );
};

const mapStateToProps = (state) => ({
  sidebarOpen: state.dashboard.sidebarOpen,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { openSidebar })(Navbar);
