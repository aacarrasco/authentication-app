import React, { Component } from 'react';
import { Button, Flex, Text } from '@chakra-ui/core';

import { AuthUserContext, withAuthorization } from '../../context/Session';

import EditProfile from './EditProfile';
import ShowProfile from './ShowProfile';

const INITIAL_STATE = {
  loading: false,
  isEdit: false,
  user: {
    name: '',
    email: '',
    biography: '',
    phone: '',
  },
};

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase
      .getUserWithUid(this.props.firebase.auth.currentUser.uid)
      .on('value', (snapshot) => {
        this.setState({
          loading: false,
          user: snapshot.val(),
        });
      });
  }

  componentWillUnmount() {
    this.props.firebase.getUserWithUid().off();
  }

  toggleView = () => {
    this.setState({ isEdit: !this.state.isEdit });
  };
  render() {
    const { loading, isEdit, user } = this.state;

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <Flex direction='column' alignItems='center'>
            {loading && <div>Loading ...</div>}
            {isEdit ? (
              <Flex direction='column' alignItems='center'>
                <Button onClick={this.toggleView}>Back</Button>
                <EditProfile user={user} />
              </Flex>
            ) : (
              <Flex direction='column' alignItems='center'>
                <Text>Personal Info</Text>
                <Text>Basic info, like your name and info</Text>
                <Button onClick={this.toggleView}>Edit</Button>
                <ShowProfile user={user} />
              </Flex>
            )}
          </Flex>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Account);
