/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { Container, createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import React, { useEffect } from 'react';
import clsx from 'clsx';
import { Redirect, Route, Switch, useLocation, useParams } from 'react-router-dom';
import AuthForm from './components/AuthForm/AuthForm';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import RegisterForm from './components/RegisterForm/RegisterForm';
import ResetPassword from './components/ResetPassword/ResetPassword';
import { themeLight, themeDark } from './test';
import useLocalStorage from './hooks/useLocalStorage';
import RichTextEditor from './components/RichTextEditor/RichTextEditor';
import useStyles from './App.styles';
import Invite from './components/Invite/Invite';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

type Action = { type: 'setTheme' } | { type: 'getAnalysis' };
type Dispatch = (action: Action) => void;
type State = { isError: boolean; errorMessage: string; isLoading: boolean; isDark: boolean };
type CountProviderProps = { children: React.ReactNode };
const CountStateContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined);

function handleDataReducer(state: State, action: Action) {
  switch (action.type) {
    case 'getAnalysis': {
      console.log(action.type);
      return;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function App() {
  const [themeColor, setThemeColor] = useLocalStorage<boolean>('theme', true);
  const [userToken, setUserToken] = useLocalStorage<string | boolean>('user', false);
  const removeToken = () => {
    setUserToken(false);
  };
  const addToken = (payload: string) => {
    setUserToken(payload);
  };
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
                transitionDelay: '9999s',
                '-webkit-text-fill-color': themeColor ? '#fff' : 'black',
              },
            },
            notchedOutline: {
              borderColor: themeColor ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.2)',
            },
          },
          MuiButton: {
            root: {
              cursor: 'pointer',
              width: '120px',
              minHeight: '44px',
              backgroundPosition: 'center',
              border: 'none',
              padding: '0',
              '&:hover': {
                backgroundColor: !themeColor ? '#f50057' : '#8852E1',
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
                position: 'relative',
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
          removeToken={removeToken}
          handleSetTheme={handleSetTheme}
          isMenuOpen={isMenuOpen}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
        />
        <Switch>
          <Route exact path="/">
            {!userToken ? <AuthForm addToken={addToken} /> : <Redirect to="/dashboard" />}
          </Route>

          <ProtectedRoute
            condition={userToken}
            component={
              <main
                className={clsx(classes.content, {
                  [classes.contentShift]: isMenuOpen,
                })}>
                <Dashboard />
              </main>
            }
            path="/dashboard"
          />
          <ProtectedRoute
            condition={userToken}
            component={
              <main
                className={clsx(classes.content, {
                  [classes.contentShift]: isMenuOpen,
                })}>
                <RichTextEditor />
              </main>
            }
            path="/send"
          />
          {/* <ProtectedRoute
            condition={userToken}
            component={
              <main
                className={clsx(classes.content, {
                  [classes.contentShift]: isMenuOpen,
                })}>
                <Invite />
              </main>
            }
            path="/invite"
          /> */}
          <Route path="/invite">
            <main
              className={clsx(classes.content, {
                [classes.contentShift]: isMenuOpen,
              })}>
              <Invite />
            </main>
          </Route>

          <Route path="/register/:id">
            <RegisterForm />
          </Route>
          <Route path="/reset_password">
            <ResetPassword />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Container>
    </ThemeProvider>
  );
}

export default App;
