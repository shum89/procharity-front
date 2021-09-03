import React from 'react'
import { Badge } from '@material-ui/core';
import TelegramIcon from '@material-ui/icons/Telegram';
import useStyles from './BotStatus.styles';

interface BotStatusProps {
    status:boolean | undefined
}
const BotStatus: React.FC<BotStatusProps> = ({ status }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Badge color={status ? 'error':"secondary" }variant="dot">
        <TelegramIcon />
      </Badge>
    </div>
  );
};

export default BotStatus
