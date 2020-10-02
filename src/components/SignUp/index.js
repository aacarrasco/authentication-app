import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Flex, Input, Text } from '@chakra-ui/core';

import { ReactComponent as DevchallengesLogo } from '../../assets/images/devchallenges.svg';

import { withFirebase } from '../../context/Firebase';
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
  <Flex
    direction='column'
    justify='center'
    borderWidth='1px'
    maxW='sm'
    rounded='lg'
    p={8}
  >
    <DevchallengesLogo />
    <Text>Join thousands of learners from around the world</Text>
    <Text>
      Master web development by making real-life projects. There are multiple
      paths for you to choose
    </Text>
    <SignUpForm />
    <Text>
      Already a member? <Link to={ROUTES.SIGN_IN}>Login</Link>
    </Text>
  </Flex>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, password } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
          Start coding now
        </Button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm };
