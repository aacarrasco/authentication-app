import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import AccountPage from '../Account';
import SignInPage from '../SignIn';
import SignUpPage from '../SignUp';

import { withFirebase } from '../../context/Firebase';

import * as ROUTES from '../../constants/routes';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount = () => {
    this.listener = this.props.firebase.auth.onAuthStateChanged((authUser) => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  };

  componentWillUnmount = () => {
    this.listener();
  };

  render() {
    return (
      <Router>
        <Navigation authUser={this.state.authUser} />
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
  }
}

export default withFirebase(App);
