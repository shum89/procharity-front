// @ts-nocheck
import { TableContainer, TableHead, Table, TableRow, TableCell, TableBody, makeStyles } from '@material-ui/core'
import React from 'react'
import TablePagination from '@material-ui/core/TablePagination'
import Typography from '@material-ui/core/Typography'
import CheckIcon from '@material-ui/icons/Check'
import ClearIcon from '@material-ui/icons/Clear'
import { UsersTableData } from '../Dashboard/Dashboard'
import Preloader from '../../components/Preloader/Preloader'
import StatusLabel from '../../components/StatusLabel/StatusLabel'
import { useAsync } from '../../hooks/useAsync'
import useLocalStorage from '../../hooks/useLocalStorage'

interface UsersProps {
  children?: React.ReactNode;
  fetchUserData: (limit: number, page: number) => Promise<UsersTableData>;
}
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  section: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  title: {
    padding: 5,
  },
  subtitle: {
    fontWeight:'bold'
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
    width: '95%',
    justifyContent: 'space-between',
  },
}))
export const formatData = (date) => {
  const options: any = { day: 'numeric', month: 'long', year: 'numeric' }
  const dateIso = new Date(date)
  const dateLocalized = new Intl.DateTimeFormat('ru-Ru', options).format(dateIso)
  return dateLocalized
}
const columns = ['ФИО', 'E-mail', 'Рассылка', 'Бот заблокирован', 'Имя пользователя', 'Дата Регистрации'];

const Users: React.FC<UsersProps> = ({ fetchUserData }) => {
  const classes = useStyles()
  const { data, error, isLoading, run, isError, reset } = useAsync({ status: 'idle', data: null, error: null })
  const [rowsPerPage, setRowsPerPage] = useLocalStorage<number>('rowsPerPage', 20)
  const [page, setPage] = useLocalStorage<number>('page', 1)
  const handleChangePage = (event: unknown, newPage: number) => {
    run(fetchUserData(newPage + 1, rowsPerPage))
    setPage(newPage + 1)
  }
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    run(fetchUserData(1, +event.target.value))
    setPage(1)
  }
  React.useEffect(() => {
    run(fetchUserData(page, rowsPerPage))
  }, [])

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <StatusLabel isStatusLabelOpen={isError} statusMessage={error} handleCloseError={reset} />

          <section className={classes.section}>
            <Typography className={classes.title} variant="h5">
              Пользователи
            </Typography>
            <TableContainer className={classes.root}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={column} align="left">
                        <Typography className={classes.subtitle} variant="subtitle1">
                          {column}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.result.map((result) => (
                    <TableRow key={result.telegram_id}>
                      <TableCell align="left">
                        <Typography variant="subtitle1">{`${result.first_name ?? 'Не указан'} ${
                          result.last_name ?? ''
                        }`}</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle1">{result.email ?? 'Не указан'}</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <div className={classes.container}>
                          {result.has_mailing ? (
                            <CheckIcon fontSize="small" className={classes.iconCheckMark} />
                          ) : (
                            <ClearIcon fontSize="small" className={classes.iconCross} />
                          )}
                        </div>
                      </TableCell>
                      <TableCell align="left">
                        <div className={classes.container}>
                          {result.banned ? (
                            <CheckIcon fontSize="small" className={classes.iconCheckMark} />
                          ) : (
                            <ClearIcon fontSize="small" className={classes.iconCross} />
                          )}
                        </div>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle1">{result.username ?? 'Не указан'}</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle1">{formatData(result.date_registration)}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                rowsPerPageOptions={[20, 50, 100]}
                count={data?.total - 1 ?? 0}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                page={page - 1 ?? 0}
                rowsPerPage={rowsPerPage}
              />
            </TableContainer>
          </section>
        </>
      )}
    </>
  );
}
export default Users
