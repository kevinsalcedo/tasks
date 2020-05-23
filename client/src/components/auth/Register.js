import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import ALERT_CONSTANTS from "../../strings/alerts";
import AUTH_CONSTANTS from "../../strings/auth";
import PAGES from "../../strings/pages";
import PropTypes from "prop-types";
import { Box, Heading, Form, Paragraph } from "grommet";
import LinkAnchor from "../routing/LinkAnchor";
import ContainerPane from "../layout/containers/ContainerPane";
import FormEmailInput from "../forms/fields/FormEmailInput";
import FormPasswordInput from "../forms/fields/FormPasswordInput";
import FormControlButtons from "../forms/fields/FormControlButtons";
import FormTextInput from "../forms/fields/FormTextInput";

const Register = ({ setAlert, register, isAuthenticated, loading }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert(ALERT_CONSTANTS.ERRORS.PASSWORD_MATCH, "danger");
    } else {
      register({ name, email, password });
    }
  };
  if (loading) {
    return <ContainerPane>Loading...</ContainerPane>;
  }
  if (!loading && isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <ContainerPane>
      <Box width="medium" pad="small" gap="small">
        <Heading color="brand">{AUTH_CONSTANTS.SIGN_UP}</Heading>
        <Heading level="3">
          <i className="fas fa-user"></i> {AUTH_CONSTANTS.REGISTER_PAGE.HEADER}
        </Heading>

        <Form
          onReset={() => {
            setName("");
            setEmail("");
            setPassword("");
            setPassword2("");
          }}
          onSubmit={(e) => onSubmit(e)}
        >
          <FormTextInput
            name="name"
            label="Name"
            value={name}
            onChange={setName}
            required
            showRequired={false}
          />

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
          <FormPasswordInput
            label="Confirm Password"
            name="password2"
            value={password2}
            onChange={setPassword2}
            required
          />

          <FormControlButtons />
        </Form>
      </Box>
      <Paragraph>
        {AUTH_CONSTANTS.REGISTER_PAGE.SWITCH}{" "}
        <LinkAnchor to={PAGES.LOGIN}>
          {AUTH_CONSTANTS.REGISTER_PAGE.SWITCH_LINK}
        </LinkAnchor>
      </Paragraph>
    </ContainerPane>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.loading.loading,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
