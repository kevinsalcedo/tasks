import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import AUTH_CONSTANTS from "../../strings/auth";
import PAGES from "../../strings/pages";
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

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [reveal, setReveal] = React.useState(false);

  const { email, password } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if logged in
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
      <Box width='large' gap='medium'>
        <Heading color='brand'>{AUTH_CONSTANTS.SIGN_IN}</Heading>
        <Heading level='3'>
          <i className='fas fa-user'></i> {AUTH_CONSTANTS.SIGN_IN_PAGE.HEADER}
        </Heading>

        <Form
          value={formData}
          onChange={(nextValue) => setFormData(nextValue)}
          onReset={() => setFormData({})}
          onSubmit={(e) => onSubmit(e)}
        >
          <FormField
            name='email'
            label={AUTH_CONSTANTS.FORM_FIELDS.EMAIL_PLACEHOLDER}
          >
            <MaskedInput
              name='email'
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
            name='password'
            label={AUTH_CONSTANTS.FORM_FIELDS.PASSWORD_PLACEHOLDER}
          >
            <Box direction='row' align='center'>
              <TextInput
                name='password'
                plain
                type={reveal ? "text" : "password"}
              />
              <Button
                icon={reveal ? <View size='medium' /> : <Hide size='medium' />}
                onClick={() => setReveal(!reveal)}
              />
            </Box>
          </FormField>
          <Box direction='row' justify='around' margin={{ top: "medium" }}>
            <Button type='submit' label='Submit' primary />
          </Box>
        </Form>

        <Paragraph>
          {AUTH_CONSTANTS.SIGN_IN_PAGE.SWITCH}{" "}
          <LinkAnchor to={PAGES.REGISTER}>
            {AUTH_CONSTANTS.SIGN_IN_PAGE.SWITCH_LINK}
          </LinkAnchor>
        </Paragraph>
      </Box>
    </Box>
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
