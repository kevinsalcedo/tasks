import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PAGES from "../../strings/pages";

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated },
  loading: { loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated && !loading ? (
        <Redirect to={PAGES.LANDING} />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  loading: state.loading,
});

export default connect(mapStateToProps)(PrivateRoute);
