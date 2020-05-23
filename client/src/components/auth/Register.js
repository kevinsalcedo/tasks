import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import ALERT_CONSTANTS from "../../strings/alerts";
import AUTH_CONSTANTS from "../../strings/auth";
import PAGES from "../../strings/pages";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Heading,
  Form,
  FormField,
  TextInput,
  MaskedInput,
  Paragraph,
} from "grommet";
import { Hide, View } from "grommet-icons";
import LinkAnchor from "../routing/LinkAnchor";
import ContainerPane from "../layout/containers/ContainerPane";

const Register = ({ setAlert, register, isAuthenticated, loading }) => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    password2: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [reveal, setReveal] = React.useState(false);

  const { name, email, password, password2 } = formData;

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
          value={formData}
          onChange={(nextValue) => setFormData(nextValue)}
          onReset={() => setFormData(initialState)}
          onSubmit={(e) => onSubmit(e)}
        >
          <FormField
            name="name"
            label={AUTH_CONSTANTS.FORM_FIELDS.NAME_PLACEHOLDER}
          >
            <TextInput name="name" />
          </FormField>
          <FormField
            name="email"
            label={AUTH_CONSTANTS.FORM_FIELDS.EMAIL_PLACEHOLDER}
          >
            <MaskedInput
              name="email"
              mask={[
                { regexp: /^[\w\-_.]+$/, placeholder: "example" },
                { fixed: "@" },
                { regexpt: /^[\w]+$/, placehodler: "my" },
                { fixed: "." },
                { regexp: /^[\w]+$/, placeholder: "com" },
              ]}
            />
          </FormField>
          <FormField
            name="password"
            label={AUTH_CONSTANTS.FORM_FIELDS.PASSWORD_PLACEHOLDER}
          >
            <Box direction="row" align="center">
              <TextInput
                name="password"
                plain
                type={reveal ? "text" : "password"}
              />
              <Button
                icon={reveal ? <View size="medium" /> : <Hide size="medium" />}
                onClick={() => setReveal(!reveal)}
              />
            </Box>
          </FormField>
          <FormField
            name="password2"
            label={AUTH_CONSTANTS.FORM_FIELDS.VERIFY_PASSWORD_PLACEHOLDER}
          >
            <Box direction="row" align="center">
              <TextInput
                name="password2"
                plain
                type={reveal ? "text" : "password"}
              />
              <Button
                icon={reveal ? <View size="medium" /> : <Hide size="medium" />}
                onClick={() => setReveal(!reveal)}
              />
            </Box>
          </FormField>
          <Box direction="row" justify="around" margin={{ top: "medium" }}>
            <Button type="reset" label="Reset" />
            <Button type="submit" label="Submit" primary />
          </Box>
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
