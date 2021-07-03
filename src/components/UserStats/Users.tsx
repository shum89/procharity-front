import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});
interface UsersProps {
  text: number;
  title: string;
}
const Users: React.FC<UsersProps> = ({ text, title }) => {
  const classes = useStyles();
  const date = Date.now();
  const options: any = { day: 'numeric', month: 'long', year: 'numeric' };
  return (
    <>
      <Typography component="p" variant="h4">
        {text}
      </Typography>
      <Typography component="p" variant="body1">
        {title}
      </Typography>
      <Typography variant="body1" color="textSecondary" className={classes.depositContext}>
        {new Intl.DateTimeFormat('ru-Ru', options).format(date)}
      </Typography>
      <div />
    </>
  );
};

export default Users;
