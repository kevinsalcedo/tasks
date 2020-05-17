import React from "react";
import { connect } from "react-redux";
import { Menu } from "grommet-icons";
import { Box, Header, Button } from "grommet";
import { openSidebar } from "../../actions/dashboard";

const Navbar = ({ sidebarOpen, openSidebar }) => {
  return (
    <Header pad='small' elevation='small'>
      <Box direction='row' align='center' gap='small'>
        <Button icon={<Menu />} onClick={() => openSidebar(!sidebarOpen)} />
      </Box>
    </Header>
  );
};

const mapStateToProps = (state) => ({
  sidebarOpen: state.dashboard.sidebarOpen,
});

export default connect(mapStateToProps, { openSidebar })(Navbar);
