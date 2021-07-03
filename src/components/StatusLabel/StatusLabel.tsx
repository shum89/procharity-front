import React from 'react';
import { Collapse, IconButton } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from './StatusLabel.style';

interface StatusLabelProps {
  open: boolean;
  isError: boolean;
  handleCloseError: () => void;
  statusMessage: null | string;
}

const StatusLabel: React.FC<StatusLabelProps> = ({ open, handleCloseError, isError, statusMessage }) => {
  const classes = useStyles();
  return (
    <Collapse in={open} className={classes.status}>
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
