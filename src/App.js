import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import * as ROUTES from './constants/routes';
import { TopAppBar } from './components/TopAppBar';
import { LandingPage } from './pages/LandingPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { HomePage } from './pages/HomePage';
import { Credits } from './pages/CreditsPage';
import { PassForgetPage } from './pages/PassForget';
import {withAuthContextProvider } from './provider/Authentication';
import { withFirebase } from './provider/Firebase';
import { NotFoundPage } from './pages/NotFound';


function App() {
    
  return (
    <div>
        <TopAppBar/>
        <Switch>
          <Route exact path={ROUTES.LANDING} component={LandingPage}/>
          <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
          <Route path={ROUTES.SIGN_UP} component={SignUpPage}/>
          <Route path={ROUTES.HOME} component={HomePage}/>
          <Route path={ROUTES.PASSWORD_FORGET} component={PassForgetPage}/>
          <Route path={ROUTES.CREDITS} component={Credits}/>
          <Route component={NotFoundPage}/>
        </Switch>
    </div>
    
  );
}

export default withFirebase(withAuthContextProvider(App));
