import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import themeOptions from './App.theme';
import AuthForm from './components/AuthForm/AuthForm';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import SendMessage from './components/SendMessage/SendMessage';

function App() {
  return (
    <ThemeProvider theme={themeOptions}>
      <div>
        <Switch>
          <Route exact path="/">
            <>
              <Header />
              <AuthForm />
            </>
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/send">
            <SendMessage />
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
