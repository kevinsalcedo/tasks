import React from "react";
import { Box, Button, Heading } from "grommet";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";

import PAGES from "../../strings/pages";

export const Landing = ({ isAuthenticated }) => {
  const history = useHistory();
  const directTo = (path) => history.push(path);

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Box
      background='white'
      align='center'
      justify='center'
      fill
      round='medium'
      elevation='small'
    >
      <Heading>Taskify</Heading>
      <Heading level='3'>Lorem ipsum dolor</Heading>
      <Box align='center' pad='large' gap='small' direction='row'>
        <Button
          plain={false}
          onClick={() => directTo(PAGES.REGISTER)}
          primary
          color='white'
          label='Sign Up'
        />

        <Button
          plain={false}
          onClick={() => directTo(PAGES.LOGIN)}
          primary
          label='Sign In'
        />
      </Box>
    </Box>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
