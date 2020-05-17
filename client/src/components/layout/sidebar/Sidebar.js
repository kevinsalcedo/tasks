import React, { useState } from "react";
import { connect } from "react-redux";
import { logout } from "../../../actions/auth";
import { loadLists } from "../../../actions/list";
import PAGES from "../../../strings/pages";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import {
  Box,
  Button,
  Collapsible,
  Sidebar as GrommetSidebar,
  Avatar,
  Menu,
  Text,
} from "grommet";
import Calendar from "./Calendar";
import TaskLists from "./TaskLists";
import DisplayButtonGroup from "./DisplayButtonGroup";
import { Menu as MenuIcon } from "grommet-icons";

export const Sidebar = (
  { logout, isAuthenticated, view, sidebarOpen },
  ...rest
) => {
  const history = useHistory();
  const directTo = (path) => history.push(path);

  const authMenuItems = [{ label: "Logout", onClick: () => logout() }];
  const guestMenuItems = [
    { label: "Register", onClick: () => directTo(PAGES.REGISTER) },
    { label: "Log In", onClick: () => directTo(PAGES.LOGIN) },
  ];

  const sideBarContent = () => (
    <GrommetSidebar
      flex={false}
      pad='small'
      header={
        <Box direction='row'>
          <Menu
            label={
              isAuthenticated ? (
                <Box direction='row' gap='small' align='center'>
                  <Avatar src='//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80' />
                  <Text>Your Name</Text>
                </Box>
              ) : (
                <Text>Get Started</Text>
              )
            }
            items={isAuthenticated ? authMenuItems : guestMenuItems}
            gap='small'
          />
        </Box>
      }
      {...rest}
    >
      <Box fill='horizontal' align='center'>
        {isAuthenticated && <DisplayButtonGroup />}
        {isAuthenticated && view === "calendar" && <Calendar />}
        {isAuthenticated && <TaskLists />}
      </Box>
    </GrommetSidebar>
  );

  return (
    <Box>
      <Collapsible direction='horizontal' open={sidebarOpen}>
        {sideBarContent()}
      </Collapsible>
    </Box>
  );
};

Sidebar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  view: PropTypes.string.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  view: state.dashboard.view,
  sidebarOpen: state.dashboard.sidebarOpen,
});

export default connect(mapStateToProps, { loadLists, logout })(Sidebar);
