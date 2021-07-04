import React from 'react';
import { Collapse, IconButton } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import { useRouteMatch } from 'react-router-dom';
import useStyles from './StatusLabel.style';

interface StatusLabelProps {
  open: boolean;
  isError: boolean;
  handleCloseError: () => void;
  statusMessage: null | string;
  isMenuOpen: boolean;
}

const StatusLabel: React.FC<StatusLabelProps> = ({ open, handleCloseError, isError, statusMessage, isMenuOpen }) => {
  const classes = useStyles();
  const matchLogin = useRouteMatch('/')?.isExact ?? false;

  const matchRegister = useRouteMatch('/register/:id')?.isExact ?? false;
  const matchReset = useRouteMatch('/reset_password')?.isExact ?? false;
  return (
    <Collapse
      in={open}
      className={clsx(classes.status, (matchLogin || matchRegister || matchReset) && classes.loggedOut)}>
      <Alert
        severity={isError ? 'error' : 'success'}
        variant="outlined"
        action={
          <IconButton aria-label="close" color="inherit" size="small" onClick={handleCloseError}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }>
        {statusMessage}
      </Alert>
    </Collapse>
  );
};

export default StatusLabel;
