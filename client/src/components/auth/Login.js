import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import AUTH_CONSTANTS from "../../strings/auth";
import PAGES from "../../strings/pages";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>{AUTH_CONSTANTS.SIGN_IN}</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> {AUTH_CONSTANTS.SIGN_IN_PAGE.HEADER}
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder={AUTH_CONSTANTS.FORM_FIELDS.EMAIL_PLACEHOLDER}
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder={AUTH_CONSTANTS.FORM_FIELDS.PASSWORD_PLACEHOLDER}
            name='password'
            minLength='6'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input
          type='submit'
          className='btn btn-primary'
          value={AUTH_CONSTANTS.SIGN_IN_PAGE.SUBMIT_BUTTON}
        />
      </form>
      <p className='my-1'>
        {AUTH_CONSTANTS.SIGN_IN_PAGE.SWITCH}{" "}
        <Link to={PAGES.REGISTER}>
          {AUTH_CONSTANTS.SIGN_IN_PAGE.SWITCH_LINK}
        </Link>
      </p>
    </Fragment>
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
