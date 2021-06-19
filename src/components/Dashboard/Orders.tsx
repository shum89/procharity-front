import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { getRandomArbitrary } from './Dashboard';
import useStyles from './Orders.styles';

// Generate Order Data
function createData(id: number, title: string, amount: number) {
  return { id, title, amount };
}

const rows = [
  createData(0, 'Test', getRandomArbitrary(0, 100)),
  createData(1, 'Test1', getRandomArbitrary(0, 100)),
  createData(2, 'Test2', getRandomArbitrary(0, 100)),
  createData(3, 'Test3', getRandomArbitrary(0, 100)),
  createData(4, 'Test4', getRandomArbitrary(0, 100)),
];

export default function Orders() {
  const classes = useStyles();
  return (
    <>
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Название Команды</TableCell>
            <TableCell align="right">Количество</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell size="small" align="left">
                {row.title}
              </TableCell>
              <TableCell size="small" align="right">
                {row.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
