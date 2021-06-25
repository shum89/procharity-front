import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import BarChartIcon from '@material-ui/icons/BarChart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router-dom';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

export const MainListItems = () => {
  const history = useHistory();
  return (
    <div>
      <ListItem button onClick={() => history.push('/dashboard')}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Статистика" />
      </ListItem>
      <ListItem button onClick={() => history.push('/send')}>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Написать Сообщение" />
      </ListItem>
      <ListItem button onClick={() => history.push('/invite')}>
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

export const SecondaryListItems: React.FC<SecondaryListItemsProps> = ({ handleLogout }) => {
  return (
    <div>
      <ListItem onClick={handleLogout} component="button" button>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Выйти" />
      </ListItem>
    </div>
  );
};
