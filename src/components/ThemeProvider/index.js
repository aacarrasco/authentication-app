import React from 'react';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import customTheme from './customTheme';

const Theme = (props) => (
  <ThemeProvider theme={customTheme}>
    <CSSReset />
    {props.children}
  </ThemeProvider>
);

export default Theme;
