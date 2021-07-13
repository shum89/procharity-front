// @ts-nocheck
import { TableContainer, TableHead, Table, TableRow, TableCell, TableBody, makeStyles } from '@material-ui/core';
import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { UsersTableData } from '../Dashboard/Dashboard';

interface UsersProps {
  children?: React.ReactNode;
  users: UsersTableData | null;
  handleChangePage: (event: unknown, newPage: number) => void;
  rowsPerPage: number;
  fetchUserData: (limit: number, page: number) => Promise<void>;

  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const useStyles = makeStyles((theme: Theme) => {
  // eslint-disable-next-line no-console
  console.log(theme.palette);
  return {
    root: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },

    title: {
      padding: 5,
    },
    iconCross: {
      fill: theme.palette.error.main,
    },
    iconCheckMark: {
      fill: theme.palette.success.main,
    },
    container: {
      alignItems: 'center',
      display: 'flex',
      width: '40%',
      justifyContent: 'space-between',
    },
  };
});
const normalizeDate = (date: string) => {
  const db = new Date(date);
  const options: any = { day: 'numeric', month: 'long', year: 'numeric' };
  const normalizedDate = new Intl.DateTimeFormat('ru-Ru', options).format(db);
  return normalizedDate;
};
const columns = ['ФИО', 'E-mail', 'Рассылка', 'Имя пользователя', 'Дата Регистрации'];
const Users: React.FC<UsersProps> = ({
  fetchUserData,
  rowsPerPage,
  users,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const classes = useStyles();

  React.useEffect(() => {
    if (users === null) {
      fetchUserData(1, 5);
    } else {
      const currentPage = users?.current_page ?? 1;
      fetchUserData(currentPage, rowsPerPage);
    }
  }, []);

  return (
    <section className={classes.root}>
      <Typography className={classes.title} variant="h5">
        Пользователи
      </Typography>
      <TableContainer className={classes.root}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column} align="left">
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.result.map((result) => (
              <TableRow key={result.telegram_id}>
                <TableCell align="left">{`${result.first_name} ${result.last_name ?? ''}`}</TableCell>
                <TableCell align="left">{result.email ?? 'Не указан '}</TableCell>
                <TableCell align="left">
                  <div className={classes.container}>
                    <Typography>{result.has_mailing ? 'Включена' : 'Выключена'}</Typography>
                    {result.has_mailing ? (
                      <CheckIcon fontSize="small" className={classes.iconCheckMark} />
                    ) : (
                      <ClearIcon fontSize="small" className={classes.iconCross} />
                    )}
                  </div>
                </TableCell>
                <TableCell align="left">{result.username ?? 'Не указан'}</TableCell>
                <TableCell align="left">{normalizeDate(result.date_registration)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          rowsPerPageOptions={[20, 50, 100]}
          count={users?.total - 1 ?? 0}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          page={users?.current_page - 1 ?? 0}
          rowsPerPage={rowsPerPage}
        />
      </TableContainer>
    </section>
  );
};
export default Users;
