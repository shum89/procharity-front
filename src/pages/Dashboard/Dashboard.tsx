/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from '../../components/Chart/Chart';
import Actions from '../../components/ActionsStats/Actions';
import Users from '../../components/UserStats/Users';

export interface userStats {
  time: string;
  amount: number;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
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
  reasons_canceling: {
    [key: string]: number;
  };
}

export interface UsersTableData {
  total: number;
  pages: number;
  previous_page: null;
  current_page: number;
  next_page: number;
  next_url: string;
  previous_url: null;
  result: Result[];
}

export interface Result {
  telegram_id: number;
  username: string;
  email: null;
  first_name: string;
  last_name: string;
  external_id: null;
  has_mailing: boolean;
  date_registration: string;
}

interface DashboardProps {
  userStats: UserData | null;

  fetchUserStats: () => Promise<void>;
}
const Dashboard: React.FC<DashboardProps> = ({ userStats, fetchUserStats }) => {
  const classes = useStyles();

  useEffect(() => {
    fetchUserStats();
  }, []);

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={4}>
          <Paper className={classes.paper}>
            <Users
              text={(userStats?.active_users ?? 0) + (userStats?.deactivated_users ?? 0)}
              title="Всего Пользователей"
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Paper className={classes.paper}>
            <Users text={userStats?.active_users ?? 0} title="Активных Пользователей" />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Paper className={classes.paper}>
            <Users text={userStats?.deactivated_users ?? 0} title="Неактивных Пользователей" />
          </Paper>
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          <Paper className={clsx(classes.fixedHeight, classes.paper)}>
            <Chart data={userStats} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Paper className={classes.paper}>
            <Actions cardTitle="Статистика команд" title="Название Команды" actionsStats={userStats?.command_stats} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Paper className={classes.paper}>
            <Actions
              cardTitle="Статистика отписок"
              title="Причина отписки"
              actionsStats={userStats?.reasons_canceling}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
