import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import AccountPage from '../Account';
import SignInPage from '../SignIn';
import SignUpPage from '../SignUp';

import * as ROUTES from '../../constants/routes';

const App = () => (
  <Router>
    <Navigation />
    <Route
      exact
      path={ROUTES.LANDING}
      render={() => <Redirect to={ROUTES.SIGN_IN} />}
    />
    <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
    <Route path={ROUTES.SIGN_IN} component={SignInPage} />
    <Route path={ROUTES.ACCOUNT} component={AccountPage} />
  </Router>
);

export default App;
