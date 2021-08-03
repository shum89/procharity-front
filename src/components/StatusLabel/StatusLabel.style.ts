import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  status: {
    position: 'absolute',
    inset: '75px 0 0 0 ',
    height: 'fit-content !important',
  },
  loggedOut: {
    inset: '60px 10% 0 10%',
  },
}));

export default useStyles;
