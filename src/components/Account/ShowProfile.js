import React from 'react';
import { Flex, Text } from '@chakra-ui/core';

const ShowProfile = ({ user }) => (
  <Flex direction='column'>
    <Flex direction='row'>
      <Text>Name</Text>
      <Text>{user.name}</Text>
    </Flex>
    <Flex direction='row'>
      <Text>Bio</Text>
      <Text>{user.biography}</Text>
    </Flex>
    <Flex direction='row'>
      <Text>Phone</Text>
      <Text>{user.phone}</Text>
    </Flex>
    <Flex direction='row'>
      <Text>Email</Text>
      <Text>{user.email}</Text>
    </Flex>
  </Flex>
);

export default ShowProfile;
