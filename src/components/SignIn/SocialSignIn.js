import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Flex, Text } from '@chakra-ui/core';

import { withFirebase } from '../../context/Firebase';
import { ReactComponent as Google } from '../../assets/images/Google.svg';
import * as ROUTES from '../../constants/routes';

class SignInWithGoogleBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = (event) => {
    this.props.firebase
      .doSignInWithGoogle()
      .then((authUser) => {
        if (authUser.additionalUserInfo.isNewUser) {
          return this.props.firebase.getUserWithUid(authUser.user.uid).set({
            name: authUser.additionalUserInfo.profile.name,
            biography: '',
            phone: '',
            email: authUser.user.email,
          });
        }
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.ACCOUNT);
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <button type='submit'>
          <Google />
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInWithGoogle = compose(
  withRouter,
  withFirebase
)(SignInWithGoogleBase);

const SocialSignIn = () => (
  <Flex direction='column'>
    <Text>or continue with these social profile</Text>
    <Flex direction='row'>
      <SignInWithGoogle />
    </Flex>
  </Flex>
);

export default SocialSignIn;
