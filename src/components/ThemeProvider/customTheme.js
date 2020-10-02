import { theme } from '@chakra-ui/core';

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    primary: {
      // TODO: finalize custom colors
      'black-1': '#000000',
      'black-2': '#333333',
      'blue-1': '#2F80ED',
      'gray-1': '#BDBDBD',
      'gray-2': '#828282',
      'gray-3': '#4F4F4F',
      'red-1': '#EB5757',
      'white-1': '#FFFFFF',
      'white-2': '#E0E0E0',
    },
  },
};

export default customTheme;
