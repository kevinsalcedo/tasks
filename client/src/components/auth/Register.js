import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import CONSTANTS from "../../strings";
import PropTypes from "prop-types";

export const Register = ({ setAlert, register }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert(CONSTANTS.ALERTS.ERRORS.PASSWORD_MATCH, "danger");
    } else {
      register({ name, email, password });
    }
  };

  const { name, email, password, password2 } = formData;
  return (
    <Fragment>
      <h1 className='large text-primary'>{CONSTANTS.REGISTER_PAGE.SIGN_UP}</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> {CONSTANTS.REGISTER_PAGE.CREATE_ACCOUNT}
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder={CONSTANTS.REGISTER_PAGE.NAME_PLACEHOLDER}
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder={CONSTANTS.REGISTER_PAGE.EMAIL_PLACEHOLDER}
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder={CONSTANTS.REGISTER_PAGE.PASSWORD_PLACEHOLDER}
            name='password'
            minLength='6'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder={CONSTANTS.REGISTER_PAGE.VERIFY_PASSWORD_PLACEHOLDER}
            name='password2'
            minLength='6'
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        {CONSTANTS.REGISTER_PAGE.SWITCH_TO_LOGIN}{" "}
        <Link to='/login'>{CONSTANTS.REGISTER_PAGE.SIGN_IN_LINK}</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, register })(Register);
