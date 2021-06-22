import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    gap: 20,
    marginTop: 120,
    paddingRight: '20px',
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
  quill: {
    width: '100%',
    '& .ql-fill': {
      fill: theme.palette.type === 'dark' ? 'white' : 'black',
      color: theme.palette.type === 'dark' ? 'white' : 'black',
    },
    '& .ql-snow': {
      fill: theme.palette.type === 'dark' ? 'white' : 'black',
      color: theme.palette.type === 'dark' ? 'white' : 'black',
    },
    '& .ql-stroke': {
      stroke: theme.palette.type === 'dark' ? 'white' : 'black',
      color: theme.palette.type === 'dark' ? 'white' : 'black',
    },
    '& .ql-picker-label': {
      color: theme.palette.type === 'dark' ? 'white' : 'black',
    },
  },
}));

export default useStyles;
