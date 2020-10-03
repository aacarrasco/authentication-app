import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Text, Link as ChakraLink } from '@chakra-ui/core';

import SignOut from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../../context/Session';

import { ReactComponent as DevchallengesLogo } from '../../assets/images/devchallenges.svg';

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {(authUser) =>
        authUser ? <NavigationAuth user={authUser} /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = ({ user }) => {
  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      wrap='wrap'
      padding={6}
    >
      <DevchallengesLogo />
      <Text>{user.email}</Text>
      <ul>
        <li>
          <Link to={ROUTES.ACCOUNT}>My Profile</Link>
        </li>
        <li>
          <ChakraLink isDisabled>Group Chat</ChakraLink>
        </li>
        <li>
          <SignOut />
        </li>
      </ul>
    </Flex>
  );
};

const NavigationNonAuth = () => <Flex p={6}></Flex>;

export default Navigation;
