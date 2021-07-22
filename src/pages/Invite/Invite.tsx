/* eslint-disable no-console */
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField, CircularProgress } from '@material-ui/core';
import * as yup from 'yup';
import { Options } from 'ky';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import useStyles from '../AuthForm/AuthForm.styles';
import StatusLabel from '../../components/StatusLabel/StatusLabel';
import { useAsync } from '../../hooks/useAsync';

interface InviteProps {
  children?: React.ReactNode;
  onSubmit: (data: InviteFormValues) => Promise<any>;
}

const schema = yup.object().shape({
  email: yup.string().email('Такой e-mail не подойдет').required('Поле e-mail необходимо к заполнению'),
});

export interface InviteFormValues extends Options {
  email: string;
}

const Invite: React.FC<InviteProps> = ({ onSubmit }) => {
  const classes = useStyles();
  const { data, error, run, isError, setData, isLoading, setError } = useAsync({
    data: null,
    error: null,
    status: 'idle',
  });

  const statusMessage = isError ? (error as string) : ((data?.message ?? '') as string);

  const isStatusLabelOpen = Boolean(error) || Boolean(data?.message);
  const handleResetLabel = () => {
    if (isError) {
      setError(null);
      return;
    }
    setData(null);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Pick<InviteFormValues, 'email'>>({ resolver: yupResolver(schema), mode: 'onTouched' });

  return (
    <div className={classes.invite}>
      <StatusLabel
        isStatusLabelOpen={isStatusLabelOpen}
        statusMessage={statusMessage}
        isError={isError}
        handleCloseError={handleResetLabel}
      />
      <form className={classes.authForm} onSubmit={handleSubmit((dataS) => run(onSubmit(dataS)))}>
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
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Button className={classes.authFormButton} type="submit">
            отправить
          </Button>
        )}
      </form>
    </div>
  );
};

export default Invite;
