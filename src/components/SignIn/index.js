import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Flex, Input, Text } from '@chakra-ui/core';

import { ReactComponent as DevchallengesLogo } from '../../assets/images/devchallenges.svg';

import { withFirebase } from '../../context/Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <Flex
    direction='column'
    justify='center'
    borderWidth='1px'
    maxW='sm'
    rounded='lg'
    p={8}
  >
    <DevchallengesLogo />
    <Text>Login</Text>
    <SignInForm />
    <Text>
      Don't have an account yet? <Link to={ROUTES.SIGN_UP}>Register</Link>
    </Text>
  </Flex>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        console.log('this.props', this.props);
        this.props.history.push(ROUTES.ACCOUNT);
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <Input
          name='email'
          value={email}
          onChange={this.onChange}
          type='text'
          placeholder='Email'
        />
        <Input
          name='password'
          value={password}
          onChange={this.onChange}
          type='password'
          placeholder='Password'
        />
        <Button disabled={isInvalid} type='submit'>
          Login
        </Button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignInPage;

export { SignInForm };
