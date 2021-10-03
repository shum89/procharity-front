import makeStyles from '@mui/styles/makeStyles';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  errorDate: {
        position: 'absolute',
    bottom: '-35px',
    color: 'red',
  },
  errorDateHidden: {
    display: 'none',
    visibility: 'hidden'
  },
  pickerContainer: {
    display: 'flex',
    marginBottom: 30,
  },
  formContainer: {
    display: 'flex',
    maxWidth: '90%',
    marginTop: 'auto',
    gap: '20px',
    '& .MuiTextField-root': {},
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'black',
    },
    position: 'relative',
  },
  button: {
    color: 'white',
    background: theme.palette.secondary.main,
  },
  content: {
    flexGrow: 1,
    height: '100%',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
    height: '100%',
  },
  fixedHeight: {
    minHeight: 240,
  },
}));

export default useStyles;
