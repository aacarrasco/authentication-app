import React from 'react';
import { Link } from 'react-router-dom';
import { Flex } from '@chakra-ui/core';

import * as ROUTES from '../../constants/routes';

const Navigation = (props) => {
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
      </ul>
    </Flex>
  );
};

export default Navigation;
