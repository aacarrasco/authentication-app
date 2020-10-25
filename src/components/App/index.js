import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { Flex } from '@chakra-ui/core';

import Navigation from '../Navigation';
import AccountPage from '../Account';
import SignInPage from '../SignIn';
import SignUpPage from '../SignUp';

import { withAuthentication } from '../../context/Session';

import * as ROUTES from '../../constants/routes';

const App = () => (
  <Flex direction='column' align='center'>
    <Router>
      <Navigation />
      <Route
        exact
        path={ROUTES.LANDING}
        render={() => <Redirect to={ROUTES.ACCOUNT} />}
      />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
    </Router>
  </Flex>
);

export default withAuthentication(App);
