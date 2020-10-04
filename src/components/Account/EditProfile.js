import React, { Component } from 'react';
import { Button, Flex, Input, Text } from '@chakra-ui/core';

import { withFirebase } from '../../context/Firebase';

const INITIAL_STATE = {
  name: '',
  email: '',
  biography: '',
  phone: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { name, email, biography, phone, passwordOne } = this.state;

    const userUpdate = {};
    if (name !== '') {
      userUpdate.name = name;
    }
    if (email !== '') {
      userUpdate.email = email;
    }
    if (biography !== '') {
      userUpdate.biography = biography;
    }
    if (phone !== '') {
      userUpdate.phone = phone;
    }

    this.props.firebase
      .updateUser(
        this.props.firebase.auth.currentUser.uid,
        userUpdate,
        passwordOne
      )
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const {
      name,
      email,
      biography,
      phone,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const currentUser = this.props.user;

    const isInvalidPassword = passwordOne === passwordTwo;
    const isInvalid =
      !isInvalidPassword ||
      (name === '' &&
        email === '' &&
        biography === '' &&
        phone === '' &&
        passwordOne === '');

    return (
      <Flex direction='column'>
        <Text>Change info</Text>
        <Text>Changes will be reflected to every services</Text>

        <form onSubmit={this.onSubmit}>
          <Flex direction='row'>
            <Text>Name</Text>
            <Input
              name='name'
              value={name}
              onChange={this.onChange}
              type='text'
              placeholder={
                currentUser.name !== ''
                  ? currentUser.name
                  : 'Enter name here...'
              }
            />
          </Flex>
          <Flex>
            <Text>Bio</Text>
            <Input
              name='biography'
              value={biography}
              onChange={this.onChange}
              type='text'
              placeholder={
                currentUser.biography !== ''
                  ? currentUser.biography
                  : 'Enter your bio...'
              }
            />
          </Flex>
          <Flex>
            <Text>Phone</Text>
            <Input
              name='phone'
              value={phone}
              onChange={this.onChange}
              type='text'
              placeholder={
                currentUser.phone !== ''
                  ? currentUser.phone
                  : 'Enter your phone...'
              }
            />
          </Flex>
          <Flex>
            <Text>Email</Text>
            <Input
              name='email'
              value={email}
              onChange={this.onChange}
              type='email'
              placeholder={
                currentUser.email !== ''
                  ? currentUser.email
                  : 'Enter your email...'
              }
            />
          </Flex>
          <Flex>
            <Text>Password</Text>
            <Input
              name='passwordOne'
              value={passwordOne}
              onChange={this.onChange}
              type='password'
              placeholder='New Password'
            />
            {passwordOne && (
              <Input
                name='passwordTwo'
                value={passwordTwo}
                onChange={this.onChange}
                type='password'
                placeholder='Confirm New Password'
              />
            )}
          </Flex>
          <Button disabled={isInvalid} type='submit'>
            Save
          </Button>

          {error && <p>{error.message}</p>}
        </form>
      </Flex>
    );
  }
}

export default withFirebase(EditProfile);
