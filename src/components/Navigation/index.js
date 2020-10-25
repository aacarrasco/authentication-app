import React from 'react';
import {
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/core';

import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../../context/Firebase';
import { AuthUserContext } from '../../context/Session';

import { ReactComponent as DevchallengesLogo } from '../../assets/images/devchallenges.svg';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {(authUser) =>
      authUser ? <NavigationAuth user={authUser} /> : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ user }) => {
  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      wrap='wrap'
      p={6}
      w='100%'
    >
      <DevchallengesLogo />
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              as={Button}
              rightIcon={!isOpen ? 'chevron-down' : 'chevron-up'}
              variant='ghost'
            >
              {user.name ? user.name : user.email.split('@')[0]}
            </MenuButton>
            <MenuList>
              <MenuItem as='a' href={ROUTES.ACCOUNT}>
                <Icon name='at-sign' m={1} />
                <span>My Profile</span>
              </MenuItem>
              <MenuItem isDisabled>
                <Icon name='chat' m={1} />
                <span>Group Chat</span>
              </MenuItem>
              <MenuDivider />
              <SignOut />
            </MenuList>
          </>
        )}
      </Menu>
    </Flex>
  );
};

const NavigationNonAuth = () => (
  <Flex
    as='nav'
    align='center'
    justify='space-between'
    wrap='wrap'
    p={6}
    w='100%'
  ></Flex>
);

const SignOutButton = ({ firebase }) => (
  <MenuItem onClick={firebase.doSignOut}>Sign Out</MenuItem>
);

const SignOut = withFirebase(SignOutButton);

export default Navigation;
