import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  status: {
    position: 'absolute',
    inset: '15px 0 0 0 ',
  },
  loggedOut: {
    inset: '0 0 0 0 ',
  },
}));

export default useStyles;
