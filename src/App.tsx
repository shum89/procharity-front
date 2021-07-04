import { Container, createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import ky from 'ky';
import AuthForm, { LoginFormValues } from './pages/AuthForm/AuthForm';
import Header from './components/Header/Header';
import Dashboard, { UserData } from './pages/Dashboard/Dashboard';
import RegisterForm, { RegisterFormValues } from './pages/RegisterForm/RegisterForm';
import ResetPassword, { ResetPasswordFormValues } from './pages/ResetPassword/ResetPassword';
import { themeLight, themeDark } from './App.theme';
import useLocalStorage from './hooks/useLocalStorage';
import RichTextEditor, { RichTextEditorFormValues } from './pages/RichTextEditor/RichTextEditor';
import useStyles from './App.styles';
import Invite, { InviteFormValues } from './pages/Invite/Invite';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import StatusLabel from './components/StatusLabel/StatusLabel';

function App() {
  const [themeColor, setThemeColor] = useLocalStorage<boolean>('theme', true);
  const [userToken, setUserToken] = useLocalStorage<string | boolean>('user', false);
  const [refreshToken, setRefreshToken] = useLocalStorage<string | boolean>('refresh_token', false);
  const removeToken = () => {
    setUserToken(false);
    setRefreshToken(false);
  };

  const [openError, setErrorOpen] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [usersStats, setUsersStats] = useState<UserData | null>(null);
  const handleCloseError = () => setErrorOpen(false);

  const getRefreshedToken = async () => {
    const responseToken = await fetch(`${process.env.REACT_APP_API_ADDRESS}/auth/token_refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (responseToken.status === 401) {
      removeToken();
    } else {
      const refreshedToken = await responseToken.json();
      setUserToken(refreshedToken.token as string);
    }
  };

  const getUsers = async () => {
    try {
      setErrorOpen(false);
      const response = await fetch(`${process.env.REACT_APP_API_ADDRESS}/analysis/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.status === 200) {
        const userData: UserData = (await response.json()) as UserData;

        setUsersStats(userData);
      } else if (response.status === 401) {
        getRefreshedToken();
      } else {
        const error = await response.json();
        setError(true);
        throw new Error(error);
      }
    } catch (e: any) {
      setErrorMessage(e.message);
    }
  };

  const onInvite = async (data: InviteFormValues) => {
    try {
      setErrorOpen(false);
      const response = await fetch(`${process.env.REACT_APP_API_ADDRESS}/auth/invitation/`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const result = await response.json();
        setErrorOpen(true);
        setErrorMessage(result.message);
      } else {
        const result = await response.json();

        throw new Error(result.message);
      }
    } catch (e: any) {
      // eslint-disable-next-line no-console
      console.log(e);
      setError(true);
      setErrorOpen(true);
      setErrorMessage(e.message);
    }
  };
  const history = useHistory();
  const onLogin = async (data: LoginFormValues) => {
    try {
      const response = await ky.post(`${process.env.REACT_APP_API_ADDRESS}/auth/login/`, {
        json: {
          ...data,
        },
        throwHttpErrors: false,
      });

      if (response.status === 200) {
        const token: { access_token: string; refresh_token: string } = await response.json();
        setUserToken(token.access_token);
        setRefreshToken(token.refresh_token);
        setError(false);
        history.push('/dashboard');
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (e: any) {
      setError(true);
      setErrorOpen(true);
      setErrorMessage(e.message);
    }
  };

  const onResetPassword = async (data: ResetPasswordFormValues) => {
    try {
      setErrorMessage(null);
      const response = await fetch(`${process.env.REACT_APP_API_ADDRESS}/auth/password_reset/`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        setErrorOpen(true);
        const result = await response.json();
        setErrorMessage(result.message);
      } else {
        const error = await response.json();
        throw new Error(error);
      }
    } catch (e: any) {
      setError(true);
      setErrorOpen(true);
      setErrorMessage(e.message);
    }
  };

  const onSubmitMessage = async (data: RichTextEditorFormValues) => {
    const stripTags = data.message.replace(/(<p[^>]+?>|<p>)/gim, '');
    const replaceEnclosedTag = stripTags.replace(/(<br[^>]+?>|<br>|<\/p>)/gim, '\n');
    const normalizedData = { message: replaceEnclosedTag };
    try {
      setErrorMessage(null);
      const response = await ky.post(`${process.env.REACT_APP_API_ADDRESS}/send_telegram_notification/`, {
        json: {
          has_mailing: data.has_mailing,
          ...normalizedData,
        },
        retry: {
          limit: 1,
          methods: ['post'],
          statusCodes: [401],
        },
        throwHttpErrors: false,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        hooks: {
          afterResponse: [
            // eslint-disable-next-line consistent-return
            async (request, options, resp) => {
              if (resp.status === 401) {
                // Get a fresh token
                const token = await ky.post(`${process.env.REACT_APP_API_ADDRESS}/auth/token_refresh/`, {
                  headers: {
                    Authorization: `Bearer ${refreshToken}`,
                  },
                });

                // Retry with the token
                request.headers.set('Authorization', `Bearer ${token}`);
                return ky(request);
              }
            },
          ],
        },
      });
      if (response.status === 200) {
        setErrorOpen(true);
        setError(false);

        const result = await response.json();
        setErrorMessage(result.result);
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (e: any) {
      setError(true);
      setErrorOpen(true);
      setErrorMessage(e.message);
    }
  };

  const onRegister = async (data: RegisterFormValues, params: { id: string }) => {
    try {
      const dataForRegistration = data;
      delete dataForRegistration?.passwordConfirmation;
      const response = await ky.post(`${process.env.REACT_APP_API_ADDRESS}/auth/register/`, {
        json: {
          ...data,
          token: params.id,
        },
        throwHttpErrors: false,
      });

      if (response.status === 200) {
        setError(false);
        history.push('/');
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (e: any) {
      setError(true);
      setErrorOpen(true);
      setErrorMessage(e.message);
    }
  };

  const handleSetTheme = () => {
    setThemeColor(!themeColor);
  };
  const handleResetErrors = () => {
    setErrorOpen(false);
  };
  const [isMenuOpen, setMenuOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setMenuOpen(true);
  };

  const handleDrawerClose = () => {
    setMenuOpen(false);
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
                backgroundColor: !themeColor ? '#303f9f' : '#8852E1',
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
          MuiLink: {
            root: {
              filter: themeColor ? 'brightness(1.5)' : 'brightness(1.0)',
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
                overflow: 'auto',
                backgroundColor: themeColor ? '#06091F' : '#f9f9f9',
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
          handleResetErrors={handleResetErrors}
        />

        <Switch>
          <Route exact path="/">
            <div className={classes.formContent}>
              <StatusLabel
                isMenuOpen={isMenuOpen}
                isError={isError}
                statusMessage={errorMessage}
                open={openError}
                handleCloseError={handleCloseError}
              />
              {!userToken ? <AuthForm onLogin={onLogin} /> : <Redirect to="/dashboard" />}
            </div>
          </Route>

          <ProtectedRoute
            condition={userToken}
            component={
              <main
                className={clsx(classes.content, {
                  [classes.contentShift]: isMenuOpen,
                })}>
                <Dashboard userStats={usersStats} fetchUserStats={getUsers} />
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
                <StatusLabel
                  isMenuOpen={isMenuOpen}
                  isError={isError}
                  statusMessage={errorMessage}
                  open={openError}
                  handleCloseError={handleCloseError}
                />
                <RichTextEditor onSubmit={onSubmitMessage} />
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
              <StatusLabel
                isMenuOpen={isMenuOpen}
                isError={isError}
                statusMessage={errorMessage}
                open={openError}
                handleCloseError={handleCloseError}
              />
              <Invite onSubmit={onInvite} />
            </main>
          </Route>

          <Route path="/register/:id">
            <StatusLabel
              isMenuOpen={isMenuOpen}
              isError={isError}
              statusMessage={errorMessage}
              open={openError}
              handleCloseError={handleCloseError}
            />
            <RegisterForm onSubmit={onRegister} />
          </Route>
          <Route path="/reset_password">
            <StatusLabel
              isMenuOpen={isMenuOpen}
              isError={isError}
              statusMessage={errorMessage}
              open={openError}
              handleCloseError={handleCloseError}
            />
            <ResetPassword onSubmit={onResetPassword} />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Container>
    </ThemeProvider>
  );
}

export default App;
