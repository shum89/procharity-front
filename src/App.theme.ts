import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

export const themeLight: ThemeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#3f51b5',
      dark: '#e3e3e3',
    },
  },
};

export const themeDark: ThemeOptions = {
  palette: {
    type: 'dark',
    primary: {
      main: '#44318d',
    },
    secondary: {
      main: '#AB81F1',
      dark: 'rgba(255,255,255,0.1)',
    },
    background: {
      default: '#06091F',
      paper: '#1F2235',
    },
    error: {
      main: '#F6483D',
    },
    divider: 'rgba(255,255,255,0.1)',
    info: {
      main: '#AB81F1',
    },
    text: {
      primary: '#ffffff',
      secondary: '#676C7A',
      disabled: '#676C7A',
    },
  },
};
