/* eslint-disable no-console */
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField, Link } from '@material-ui/core';
import * as yup from 'yup';
import { Options } from 'ky';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import useStyles from '../AuthForm/AuthForm.styles';

interface ResetPasswordProps {
  children?: React.ReactNode;
  onSubmit: (data: ResetPasswordFormValues) => Promise<void>;
}

const schema = yup.object().shape({
  email: yup.string().email('Такой e-mail не подойдет').required('Поле e-mail необходимо к заполнению'),
});

export interface ResetPasswordFormValues extends Options {
  email: string;
}
const ResetPassword: React.FC<ResetPasswordProps> = ({ onSubmit }) => {
  const classes = useStyles();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Pick<ResetPasswordFormValues, 'email'>>({ resolver: yupResolver(schema), mode: 'onTouched' });

  return (
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
      <Link component={RouterLink} to="/">
        Вернуться на главную
      </Link>
      <Button className={classes.authFormButton} type="submit">
        Отправить
      </Button>
    </form>
  );
};

export default ResetPassword;
