/* eslint-disable no-console */
import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@material-ui/icons/Close';
import { Button, Collapse, IconButton, TextField } from '@material-ui/core';
import * as yup from 'yup';
import { Options } from 'ky';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Alert } from '@material-ui/lab';
import useStyles from '../AuthForm/AuthForm.styles';

interface InviteProps {
  children?: React.ReactNode;
}

const schema = yup.object().shape({
  email: yup.string().email('Такой e-mail не подойдет').required('Поле e-mail необходимо к заполнению'),
});

export interface FormValues extends Options {
  email: string;
}
const Invite: React.FC<InviteProps> = () => {
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Pick<FormValues, 'email'>>({ resolver: yupResolver(schema), mode: 'onTouched' });
  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_ADDRESS}/auth/invitation/`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const result = await response.json();
        setOpen(true);
        setErrorMessage(result.message);
      } else {
        const result = await response.json();
        throw new Error(result.message);
      }
    } catch (e: any) {
      setOpen(true);
      setErrorMessage(e.message);
    }
  };
  return (
    <div className={classes.invite}>
      <Collapse in={open} className={classes.statusInfo}>
        <Alert
          severity={errorMessage ? 'error' : 'success'}
          variant="outlined"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }>
          {errorMessage || 'Ваше сообщение успешно отправлено'}
        </Alert>
      </Collapse>

      <form className={classes.authForm} onSubmit={handleSubmit(onSubmit)}>
        <fieldset className={classes.authFormInputContainer}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="E-mail"
                error={Boolean(errors.email?.message)}
                helperText={errors.email?.message}
                className={classes.authFormInput}
                size="medium"
                variant="outlined"
                {...field}
              />
            )}
          />
        </fieldset>
        <Button className={classes.authFormButton} type="submit">
          отправить
        </Button>
      </form>
    </div>
  );
};

export default Invite;
