import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import useStyles from './Actions.styles';

interface ActionsProps {
  actionsStats: { [key: string]: number } | undefined;
}
const Actions: React.FC<ActionsProps> = ({ actionsStats }) => {
  const classes = useStyles();
  const stats = actionsStats ?? { command_stats: 0 };
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
          {Object.keys(stats).map((actionName) => (
            <TableRow key={actionName}>
              <TableCell>{actionName}</TableCell>
              <TableCell align="right">{stats[actionName]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Actions;
