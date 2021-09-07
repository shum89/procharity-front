import React from 'react';
import ListItem from '@material-ui/core/ListItem';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import BarChartIcon from '@material-ui/icons/BarChart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router-dom';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupIcon from '@material-ui/icons/Group';
import Divider from '@material-ui/core/Divider';
import useStyles from './NavigationItems.styles';

interface MainListItemsProps {
  handleCloseError: () => void;
}

export const MainListItems: React.FC<MainListItemsProps> = ({ handleCloseError }) => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <div>
      <ListItem
        button
        onClick={() => {
          history.push('/dashboard');
          handleCloseError();
        }}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Статистика" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          history.push('/users');
          handleCloseError();
        }}>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Пользователи" />
      </ListItem>
      <Divider className={classes.root} />
      <ListItem
        button
        onClick={() => {
          history.push('/send');
          handleCloseError();
        }}>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Написать Сообщение" />
      </ListItem>

      <ListItem
        button
        onClick={() => {
          history.push('/invite');
          handleCloseError();
        }}>
        <ListItemIcon>
          <PersonAddIcon />
        </ListItemIcon>
        <ListItemText primary="Пригласить" />
      </ListItem>
    </div>
  );
};

interface SecondaryListItemsProps {
  handleLogout: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const SecondaryListItems: React.FC<SecondaryListItemsProps> = ({ handleLogout }) => (
  <div>
    <ListItem onClick={handleLogout} component="button" button>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Выйти" />
    </ListItem>
  </div>
);
