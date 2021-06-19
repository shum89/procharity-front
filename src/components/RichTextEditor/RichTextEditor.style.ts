import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    gap: 20,
  },
  authFormButton: {
    cursor: 'pointer',
    top: '8px',
    right: '12px',
    width: '90px',
    minHeight: '44px',
    backgroundPosition: 'center',
    background: theme.palette.secondary.main,
    border: 'none',
    padding: '0',
  },
}));

export default useStyles;
