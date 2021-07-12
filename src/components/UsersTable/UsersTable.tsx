// @ts-nocheck
import { TableContainer, TableHead, Table, TableRow, TableCell, TableBody, makeStyles } from '@material-ui/core';
import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import { UsersTableData } from '../../pages/Dashboard/Dashboard';

interface UsersTableProps {
  children?: React.ReactNode;
  usersTable: UsersTableData | null;
  handleChangePage: (event: unknown, newPage: number) => void;
  rowsPerPage: number;

  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  title: {
    padding: 5,
  },
});
const normalizeDate = (date: string) => {
  const db = new Date(date);
  const options: any = { day: 'numeric', month: 'long', year: 'numeric' };
  const normalizedDate = new Intl.DateTimeFormat('ru-Ru', options).format(db);
  return normalizedDate;
};
const columns = ['ФИО', 'E-mail', 'Рассылка', 'Имя пользователя', 'Дата Регистрации'];
const UsersTable: React.FC<UsersTableProps> = ({
  rowsPerPage,
  usersTable,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.title} variant="h5">
        Пользователи
      </Typography>
      <TableContainer className={classes.container}>
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
            {usersTable?.result.map((result) => (
              <TableRow key={result.telegram_id}>
                <TableCell align="left">{`${result.first_name} ${result.last_name ?? ''}`}</TableCell>
                <TableCell align="left">{result.email ?? 'Не указан '}</TableCell>
                <TableCell align="left">{result.has_mailing ? 'Включена' : 'Выключена'}</TableCell>
                <TableCell align="left">{result.username ?? 'Не указан'}</TableCell>
                <TableCell align="left">{normalizeDate(result.date_registration)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          rowsPerPageOptions={[2, 5, 10, 20]}
          count={usersTable?.total - 1 ?? 0}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          page={usersTable?.current_page - 1 ?? 0}
          rowsPerPage={rowsPerPage}
        />
      </TableContainer>
    </>
  );
};
export default UsersTable;
