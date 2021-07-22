import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  preloader: {
    position: 'absolute',
    inset: '0',
    margin: 'auto',
  },
}));

export default useStyles;
