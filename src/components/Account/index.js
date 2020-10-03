import React from 'react';
import { Flex, Text } from '@chakra-ui/core';

import { AuthUserContext, withAuthorization } from '../../context/Session';

const Account = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <Flex direction='column'>
        <Text>Personal Info</Text>
        <Text>{authUser.email}</Text>
      </Flex>
    )}
  </AuthUserContext.Consumer>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Account);
