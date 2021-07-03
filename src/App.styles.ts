/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { themeDark } from './test';

const drawerWidth = 268;

const useStyles = makeStyles((theme: Theme) => {
  const match = useRouteMatch('/send')?.isExact ?? false;
  return {
    root: {
      background: theme.palette.type === 'light' ? themeDark.palette?.background?.default : '#FFFFF',
    },
    content: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflow: 'hidden',
      marginLeft: '100px',
      marginTop: '60px',
      display: 'flex',
      flexDirection: 'column',
      width: `calc(100% - 260px)`,
    },
    contentShift: {
      overflow: 'visible',
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      width: match ? `calc(100% - ${drawerWidth}px)` : `calc(100% - ${drawerWidth + 80}px)`,
      marginLeft: drawerWidth,
    },
  };
});

export default useStyles;
