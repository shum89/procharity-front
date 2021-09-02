import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Typography from '@material-ui/core/Typography';
import useStyles from './Actions.styles';

interface ActionsProps {
  actionsStats: { [key: string]: number } | undefined;
  title: string;
  cardTitle: string;
}
const Actions: React.FC<ActionsProps> = ({ actionsStats, title, cardTitle }) => {
  const classes = useStyles();
  const stats = actionsStats ?? { command_stats: 0 };
  return (
    <>
      <Typography className={classes.title} variant="h4">
        {cardTitle}
      </Typography>
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography className={classes.subtitle} variant="h5">
                {title}
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography className={classes.subtitle} variant="h5">
                Количество
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(stats).map((actionName) => (
            <TableRow key={actionName}>
              <TableCell>
                <Typography variant="h6">{actionName}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">{stats[actionName]}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Actions;
