import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  buttonContainer: {
    marginTop: 90,
    '& button': {
      backgroundColor: theme.palette.info.light,
    },
  },
}));

export default useStyles;
