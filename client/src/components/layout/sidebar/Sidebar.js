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
  ResponsiveContext,
} from "grommet";
import Calendar from "./Calendar";
import TaskLists from "./TaskLists";

export const Sidebar = (
  { logout, isAuthenticated, user, sidebarOpen },
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
    <ResponsiveContext.Consumer>
      {(responsive) => (
        <GrommetSidebar
          header={
            <Box direction='row' align='center'>
              <Menu
                label={
                  isAuthenticated ? (
                    <Box direction='row' gap='small' align='center'>
                      <Text>{isAuthenticated && user ? user.name : ""}</Text>
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
          <Box width={responsive === "small" ? "medium" : null} align='center'>
            <Calendar />
            {isAuthenticated && <TaskLists />}
          </Box>
        </GrommetSidebar>
      )}
    </ResponsiveContext.Consumer>
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
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  sidebarOpen: state.dashboard.sidebarOpen,
  user: state.auth.user,
});

export default connect(mapStateToProps, { loadLists, logout })(Sidebar);
