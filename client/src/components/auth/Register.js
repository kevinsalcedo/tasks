import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import ALERT_CONSTANTS from "../../strings/alerts";
import AUTH_CONSTANTS from "../../strings/auth";
import PAGES from "../../strings/pages";
import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert(ALERT_CONSTANTS.ERRORS.PASSWORD_MATCH, "danger");
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>{AUTH_CONSTANTS.SIGN_UP}</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> {AUTH_CONSTANTS.REGISTER_PAGE.HEADER}
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder={AUTH_CONSTANTS.FORM_FIELDS.NAME_PLACEHOLDER}
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
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
        <div className='form-group'>
          <input
            type='password'
            placeholder={AUTH_CONSTANTS.FORM_FIELDS.VERIFY_PASSWORD_PLACEHOLDER}
            name='password2'
            minLength='6'
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input
          type='submit'
          className='btn btn-primary'
          value={AUTH_CONSTANTS.REGISTER_PAGE.SUBMIT_BUTTON}
        />
      </form>
      <p className='my-1'>
        {AUTH_CONSTANTS.REGISTER_PAGE.SWITCH}{" "}
        <Link to={PAGES.LOGIN}>{AUTH_CONSTANTS.REGISTER_PAGE.SWITCH_LINK}</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
