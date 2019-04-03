import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const Private_Route = ({ component: C, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        auth.authenticated === true ? (
          <C {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  auth: state.authReducer
});

export default connect(mapStateToProps)(Private_Route);
