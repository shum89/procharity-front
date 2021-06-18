import { createMuiTheme } from '@material-ui/core/styles';

const themeOptions = createMuiTheme({
  palette: {
    primary: {
      main: '#44318d',
    },
    secondary: {
      main: '#AB81F1',
    },
    background: {
      default: '#06091F',
      paper: 'rgba(255,255,255,0.1)',
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
  overrides: {
    MuiFormHelperText: {
      root: {
        position: 'absolute',
        bottom: '-19px',
        whiteSpace: 'nowrap',
        margin: 0,
        textAlign: 'left',
      },
      contained: {
        marginLeft: '0',
        marginRight: 0,
      },
    },
    MuiOutlinedInput: {
      notchedOutline: {
        borderColor: 'rgba(255, 255, 255,0.2)',
      },
    },
    MuiButton: {
      root: {
        '&:hover': {
          backgroundColor: '#8852E1',
        },
      },
    },
    MuiSvgIcon: {
      root: {
        fill: 'white',
      },
    },
    MuiTextField: {
      root: {
        '&:hover': {
          borderColor: '#8852E1',
        },
      },
    },
  },
});

export default themeOptions;
