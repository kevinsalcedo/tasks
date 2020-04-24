import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import PAGES from "../../strings/pages";
import {
  Box,
  Header,
  Heading,
  Menu,
  Nav,
  ResponsiveContext,
  Button,
} from "grommet";
import LinkAnchor from "../routing/LinkAnchor";
import { useHistory } from "react-router-dom";

const Navbar = ({ logout, auth: { isAuthenticated, loading }, ...rest }) => {
  const history = useHistory();
  const directTo = (path) => history.push(path);

  const authNavLinks = (
    <Nav direction='row'>
      {/* <LinkAnchor primary onClick={() => logout()} to='/'> */}
      <Button onClick={() => logout()}>
        <i className='fas fa-sign-out-alt'></i>{" "}
        <span className='hide-sm'>Logout</span>
      </Button>

      {/* </LinkAnchor> */}
    </Nav>
  );

  const guestNavLinks = (
    <Nav direction='row'>
      <LinkAnchor primary to={PAGES.REGISTER}>
        Register
      </LinkAnchor>
      <LinkAnchor primary to={PAGES.LOGIN}>
        Login
      </LinkAnchor>
    </Nav>
  );

  const authMenuItems = [{ label: "Logout", onClick: () => logout() }];

  const guestMenuItems = [
    { label: "Register", onClick: () => directTo(PAGES.REGISTER) },
    { label: "Log In", onClick: () => directTo(PAGES.LOGIN) },
  ];

  const renderNavContext = () => (
    <ResponsiveContext.Consumer>
      {(responsive) =>
        responsive === "small" ? (
          <Menu
            label='Menu'
            items={isAuthenticated ? authMenuItems : guestMenuItems}
          />
        ) : (
          <Fragment>{isAuthenticated ? authNavLinks : guestNavLinks}</Fragment>
        )
      }
    </ResponsiveContext.Consumer>
  );
  return (
    <Header pad='medium' elevation='small' {...rest}>
      <Box direction='row' align='center' gap='small'>
        <LinkAnchor to={PAGES.DASHBOARD}>
          <Heading>
            <i className='fas fa-code'></i> Tasker
          </Heading>
        </LinkAnchor>
      </Box>
      {!loading && renderNavContext()}
    </Header>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
