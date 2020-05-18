import React from "react";
import { connect } from "react-redux";
import { logout } from "../../../actions/auth";
import { loadLists } from "../../../actions/list";
import PAGES from "../../../strings/pages";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import {
  Box,
  Collapsible,
  Sidebar as GrommetSidebar,
  Menu,
  Text,
} from "grommet";
import Calendar from "./Calendar";
import TaskLists from "./TaskLists";

export const Sidebar = (
  { logout, isAuthenticated, userName, sidebarOpen },
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
      header={
        <Box direction='row'>
          <Menu
            label={
              isAuthenticated ? (
                <Box direction='row' gap='small' align='center'>
                  <Text>{userName}</Text>
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
      pad='medium'
    >
      <Box fill='horizontal' align='center'>
        {isAuthenticated && <Calendar />}
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
  sidebarOpen: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  sidebarOpen: state.dashboard.sidebarOpen,
  userName: state.auth.user.name,
});

export default connect(mapStateToProps, { loadLists, logout })(Sidebar);
