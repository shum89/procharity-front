import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import useStyles from './UnsubscribedStats.styles';

interface UnsubscribedStatsProps {
  unsubscribedStats: { [key: string]: number } | undefined;
}

const UnsubscribedStats: React.FC<UnsubscribedStatsProps> = ({ unsubscribedStats }) => {
  const classes = useStyles();
  const stats = unsubscribedStats ?? { command_stats: 0 };
  return (
    <>
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Причина Отписки</TableCell>
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

export default UnsubscribedStats;
