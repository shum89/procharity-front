/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
import { Collapse, IconButton, CircularProgress } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Chart from './Chart';
import Actions from './Actions';
import Users from './Users';

export interface Data {
  time: string;
  amount: number;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  authFormError: {
    position: 'absolute',
    top: 70,
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100%',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
  },
  fixedHeight: {
    minHeight: 240,
  },
}));
export interface UserData {
  active_users: number;
  deactivated_users: number;
  added_users: { [key: string]: number };
  command_stats: {
    [key: string]: number;
  };
}
export default function Dashboard() {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<UserData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/v1/analysis/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('user')}`,
          },
        });

        if (response.ok) {
          const userData: UserData = (await response.json()) as UserData;
          // eslint-disable-next-line no-console
          setData(userData);
        } else {
          const error = await response.json();
          throw new Error(error);
        }
      } catch (e: any) {
        setErrorMessage(e.message);
      }
    };
    getUsers();
  }, [history]);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Collapse in={open} className={classes.authFormError}>
        <Alert
          severity="error"
          variant="outlined"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }>
          {errorMessage}
        </Alert>
      </Collapse>
      <Grid container spacing={4}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={classes.fixedHeight}>
            <Chart data={data} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Paper>
            <Users text={data?.active_users ?? 0} title="Активных Пользователей" />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Paper>
            <Users text={data?.deactivated_users ?? 0} title="Неактивных Пользователей" />
          </Paper>
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          <Paper className={classes.paper}>
            <Actions actionsStats={data?.command_stats} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
