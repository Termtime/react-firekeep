import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { withFirebase } from './Firebase/context';
import * as ROUTES from '../constants/routes';
import { compose } from 'recompose';

export const AuthContext = React.createContext();
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

export const withAuthContextProvider = Component => props => 
{
  const [authUser, setAuthUser] = useState(null);

  useEffect( () => 
    {
      const unsubscribeListener = props.firebase.auth.onAuthStateChanged( user => {
        if (user) {
            setAuthUser(user);
        } else {
            // removes user on logout
            setAuthUser(null);
        }
      });

      return unsubscribeListener;
    }
    ,[]);

    return (
      <AuthContext.Provider value={authUser}>
        <Component {...props} />
      </AuthContext.Provider>
    );
}

export const withAuthContext = Component => props =>
{
  return (
    <AuthContext.Consumer>
      {authUser => <Component {...props} authUser={authUser}/>}
    </AuthContext.Consumer>
  )
}

