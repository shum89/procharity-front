/* eslint-disable no-console */
import { Container, createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import React, { useEffect } from 'react';
import clsx from 'clsx';
import { Route, Switch } from 'react-router-dom';
import AuthForm from './components/AuthForm/AuthForm';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import RegisterForm from './components/RegisterForm/RegisterForm';
import { themeLight, themeDark } from './test';
import useLocalStorage from './hooks/useLocalStorge';

import RichTextEditor from './components/RichTextEditor/RichTextEditor';
import useStyles from './App.styles';

function App() {
  const [themeColor, setThemeColor] = useLocalStorage<boolean>('theme', true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSetTheme = () => {
    setThemeColor(!themeColor);
  };
  const [isMenuOpen, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  useEffect(() => {
    const handleSetThemeLocal = () => {
      setThemeColor(themeColor);
    };
    if (localStorage.getItem('theme') === null) {
      handleSetThemeLocal();
    }
  }, [setThemeColor, themeColor]);
  const theme = themeColor ? themeDark : themeLight;
  // eslint-disable-next-line no-console
  const themeOptions = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          ...theme.palette,
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
            input: {
              '&:-webkit-autofill': {
                '-webkit-box-shadow': '0 0 0 100px #000 inset',
                '-webkit-text-fill-color': '#fff',
              },
            },
            notchedOutline: {
              borderColor: themeColor ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.2)',
            },
          },
          MuiButton: {
            root: {
              cursor: 'pointer',
              top: '8px',
              right: '12px',
              width: '90px',
              minHeight: '44px',
              backgroundPosition: 'center',
              border: 'none',
              padding: '0',
              '&:hover': {
                backgroundColor: !themeColor ? '#f73378' : '#8852E1',
              },
            },
          },
          MuiSvgIcon: {
            root: {
              fill: themeColor ? 'white' : 'black',
            },
          },
          MuiTextField: {
            root: {
              '&:hover': {
                borderColor: '#8852E1',
              },
            },
          },
          MuiContainer: {
            root: {
              width: '100%',
              maxWidth: '100%',
              paddingLeft: 0,
              paddingRight: 0,
              marginLeft: 0,
              marginRight: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '@media (min-width: 600px)': {
                paddingLeft: 0,
                paddingRight: 0,
              },
            },
            maxWidthLg: {
              width: '100%',
              maxWidth: '100%',
              '@media (min-width: 1280px)': {
                width: '100%',
                maxWidth: '100%',
              },
            },
          },
          MuiCssBaseline: {
            '@global': {
              body: {
                backgroundColor: themeColor ? '#06091F' : '#F8FAFD',
              },
            },
          },
        },
      }),
    [theme.palette, themeColor],
  );

  return (
    <ThemeProvider theme={themeOptions}>
      <CssBaseline />
      <Container>
        <Header
          isDark={themeColor}
          handleSetTheme={handleSetTheme}
          isMenuOpen={isMenuOpen}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
        />
        <Switch>
          <Route exact path="/">
            <AuthForm />
          </Route>

          <Route path="/dashboard">
            <main
              className={clsx(classes.content, {
                [classes.contentShift]: isMenuOpen,
              })}>
              <Dashboard />
            </main>
          </Route>
          <Route path="/send">
            <main
              className={clsx(classes.content, {
                [classes.contentShift]: isMenuOpen,
              })}>
              <RichTextEditor />
            </main>
          </Route>

          <Route path="/register">
            <RegisterForm />
          </Route>
        </Switch>
      </Container>
    </ThemeProvider>
  );
}

export default App;
