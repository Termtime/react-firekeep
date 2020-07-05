import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { withFirebase } from './Firebase/context';
import * as ROUTES from '../constants/routes';
import { compose } from 'recompose';

export const protectedWithAuth = condition => Component => {

  class WithAuthorization extends React.Component {
    componentDidMount() {
      //listen for a change in the user logout to return to sign in page
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.SIGN_IN);
          }
        },
      );
    }
 
    componentWillUnmount() {
      this.listener();
    }
 
    render() {
      return (
        <Component {...this.props} />
      );
    }
  }

  return compose(
    withRouter,
    withFirebase,
  )(WithAuthorization);
};


