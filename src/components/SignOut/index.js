import React from 'react';
import { Button } from '@chakra-ui/core';

import { withFirebase } from '../../context/Firebase';

const SignOutButton = ({ firebase }) => (
  <Button type='button' onClick={firebase.doSignOut}>
    Sign Out
  </Button>
);

export default withFirebase(SignOutButton);
