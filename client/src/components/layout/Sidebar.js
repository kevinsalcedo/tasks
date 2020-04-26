import React from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PAGES from "../../strings/pages";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import {
  Box,
  Sidebar as GrommetSidebar,
  Button,
  Avatar,
  Heading,
  Menu,
  Text,
  ResponsiveContext,
} from "grommet";
import Calendar from "../layout/Calendar";
import { Help } from "grommet-icons";
export const Sidebar = ({ logout, isAuthenticated }, ...rest) => {
  const history = useHistory();
  const directTo = (path) => history.push(path);

  const authMenuItems = [{ label: "Logout", onClick: () => logout() }];
  const guestMenuItems = [
    { label: "Register", onClick: () => directTo(PAGES.REGISTER) },
    { label: "Log In", onClick: () => directTo(PAGES.LOGIN) },
  ];

  const renderSidebarContext = () => (
    <ResponsiveContext.Consumer></ResponsiveContext.Consumer>
  );

  return (
    <GrommetSidebar
      header={
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
          open={!isAuthenticated}
        />
      }
      footer={<Button icon={<Help />} hoverIndicator />}
      {...rest}
    >
      {isAuthenticated && <Calendar />}
      {/* <Nav gap='small'>
        <Button icon={<Projects />} hoverIndicator />
        <Button icon={<Clock />} hoverIndicator />
      </Nav> */}
    </GrommetSidebar>
  );
};

Sidebar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Sidebar);
