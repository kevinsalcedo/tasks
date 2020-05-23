import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import AUTH_CONSTANTS from "../../strings/auth";
import PAGES from "../../strings/pages";
import { Box, Heading, Form, Paragraph } from "grommet";
import LinkAnchor from "../routing/LinkAnchor";
import ContainerPane from "../layout/containers/ContainerPane";
import FormControlButtons from "../forms/fields/FormControlButtons";
import FormPasswordInput from "../forms/fields/FormPasswordInput";
import FormEmailInput from "../forms/fields/FormEmailInput";

const Login = ({ login, isAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const { email, password } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <ContainerPane>
      <Box gap="medium" width="medium" pad="small">
        <Heading color="brand">{AUTH_CONSTANTS.SIGN_IN}</Heading>
        <Heading level="3">
          <i className="fas fa-user"></i> {AUTH_CONSTANTS.SIGN_IN_PAGE.HEADER}
        </Heading>

        <Form
          onReset={() => {
            setEmail("");
            setPassword("");
          }}
          onSubmit={(e) => onSubmit(e)}
        >
          <FormEmailInput
            label="Email Address"
            name="email"
            value={email}
            onChange={setEmail}
            required
          />
          <FormPasswordInput
            label="Password"
            name="password"
            value={password}
            onChange={setPassword}
            required
          />
          <FormControlButtons submitOnly />
        </Form>

        <Paragraph>
          {AUTH_CONSTANTS.SIGN_IN_PAGE.SWITCH}{" "}
          <LinkAnchor to={PAGES.REGISTER}>
            {AUTH_CONSTANTS.SIGN_IN_PAGE.SWITCH_LINK}
          </LinkAnchor>
        </Paragraph>
      </Box>
    </ContainerPane>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, { login })(Login);
