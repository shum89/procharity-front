/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react';
import clsx from 'clsx';
import { ErrorBoundary } from 'react-error-boundary';
import { Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from '../../components/Chart/Chart';
import ActionsStats from '../../components/ActionsStats/ActionsStats';
import Users from '../../components/UserStats/Users';
import Preloader from '../../components/Preloader/Preloader';
import { useAsync } from '../../hooks/useAsync';
import StatusLabel from '../../components/StatusLabel/StatusLabel';
import useStyles from './Dashboard.styles';



export interface userStats {
  time: string;
  amount: number;
}
const active = ['Активная', 'Активные', 'Активных'];
const task = ['задача', 'задачи', 'задач'];
function declOfNum(n: number, titles: any) {
  return titles[
    n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2
  ];
}
// interface ErrorFallbackProps {
//   error: {message: string};
//   resetErrorBoundary: () => void;
// }
const ErrorFallback = ({ error, resetErrorBoundary }: any) => (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
export interface UserData {
  active_users: number;
  number_users: {
    all_users: number;
    banned_users: number;
    not_subscribed_users: number;
    subscribed_users: number;
  };
  deactivated_users: number;
  added_users: { [key: string]: number };
  users_unsubscribed: { [key: string]: number };
  distinct_users_unsubscribed: { [key: string]: number };
  active_users_statistic: {
    all: {
      [key: string]: number;
    };
    subscribed: {
      [key: string]: number;
    };
    unsubscribed: {
      [key: string]: number;
    };
  };
  all_users_statistic: {
    added_external_users: {
      [key: string]: number;
    };
    added_users: {
      [key: string]: number;
    };
    users_unsubscribed: {
      [key: string]: number;
    };
  };
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
  fetchUserStats: () => Promise<UserData>;
}
const Dashboard: React.FC<DashboardProps> = ({ fetchUserStats }) => {
  const classes = useStyles();
  const { data, error, run, isError, reset, isLoading } = useAsync({ status: 'idle', data: null, error: null });

  useEffect(() => { 
    run(fetchUserStats());
  }, []);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <StatusLabel isStatusLabelOpen={isError} statusMessage={error} isError={isError} handleCloseError={reset} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3} lg={3}>
                <Paper className={classes.paper}>
                  <Users text={data?.number_users.all_users ?? 0} title="Всего пользователей" />
                </Paper>
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <Paper className={classes.paper}>
                  <Users text={data?.number_users.subscribed_users ?? 0} title="Подписка включена" />
                </Paper>
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <Paper className={classes.paper}>
                  <Users text={data?.number_users.not_subscribed_users ?? 0} title="Подписка выключена" />
                </Paper>
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <Paper className={classes.paper}>
                  <Users text={data?.number_users.banned_users ?? 0} title="Бот заблокирован" />
                </Paper>
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <Paper className={classes.paper}>
                  <Users
                    text={data?.active_users_statistic.active_users_per_month ?? 0}
                    title="Активных пользователей в месяц"
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <Paper className={classes.paper}>
                  <Users
                    lastUpdate={data?.tasks.last_update}
                    text={data?.tasks.active_tasks ?? 0}
                    title={`${declOfNum(data?.tasks.active_tasks ?? 0, active)} ${declOfNum(
                      data?.tasks.active_tasks ?? 0,
                      task,
                    )}`}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Paper className={clsx(classes.fixedHeight, classes.paper)}>
                  <Chart data={data} title="Статистика пользователей за месяц" />
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Paper className={clsx(classes.fixedHeight, classes.paper)}>
                  <Chart data={data} title="Статистика активных пользователей за месяц" />
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Paper className={clsx(classes.fixedHeight, classes.paper)}>
                  <Chart data={data} title="Статистика отписавшихся пользователей за месяц" />
                </Paper>
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
                <Paper className={classes.paper}>
                  <ActionsStats
                    cardTitle="Статистика команд"
                    title="Название Команды"
                    actionsStats={data?.command_stats}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Paper className={classes.paper}>
                  <ActionsStats
                    cardTitle="Статистика отписок"
                    title="Причина отписки"
                    actionsStats={data?.reasons_canceling}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </ErrorBoundary>
      )}
    </>
  );
};

export default Dashboard;
