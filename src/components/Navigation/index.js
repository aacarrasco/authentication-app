import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Text } from '@chakra-ui/core';

import SignOut from '../SignOut';
import * as ROUTES from '../../constants/routes';

const Navigation = ({ authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);

const NavigationAuth = (props) => {
  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      wrap='wrap'
      padding='1.5rem'
      {...props}
    >
      <ul>
        <li>
          <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
        <li>
          <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
          <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        <li>
          <SignOut />
        </li>
      </ul>
    </Flex>
  );
};

const NavigationNonAuth = () => <Text>Not authorized</Text>;

export default Navigation;
