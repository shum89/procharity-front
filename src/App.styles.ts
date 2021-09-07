import { useRouteMatch } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { themeDark } from './App.theme';

const drawerWidth = 268;

const useStyles = makeStyles((theme: Theme) => {
  const match = useRouteMatch('/send')?.isExact ?? false;
  return {
    root: {
      background: theme.palette.type === 'light' ? themeDark.palette?.background?.default : '#FFFFF',
    },
    formContent: {
      position: 'relative',
    },
    content: {
      position: 'relative',
      minHeight: '100vh',
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflow: 'visible',
      marginLeft: '75px',
      marginTop: '60px',
      display: 'flex',
      flexDirection: 'column',
      width: `calc(100% - 175px)`,
      '@media (max-width: 599px)': {
        width: '90%',
        marginLeft: 0,
      },
    },
    contentShift: {
      overflow: 'visible',
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      width: match ? `calc(100% - ${drawerWidth}px)` : `calc(100% - ${drawerWidth + 20}px)`,
      marginLeft: 255,
    },
  };
});

export default useStyles;
