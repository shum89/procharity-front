/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { TextField, Button, Link } from '@material-ui/core';
import { useHistory, Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import ky, { Options } from 'ky';

import useStyles from './AuthForm.styles';
import useLocalStorage from '../../hooks/useLocalStorage';

export const LinkBehavior = React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((props, ref) => (
  <RouterLink ref={ref} to="/getting-started/installation/" {...props} />
));

const schema = yup.object().shape({
  email: yup.string().email('Такой e-mail не подойдет').required('Поле e-mail необходимо к заполнению'),
  password: yup.string().required('Поле пароль необходимо к заполнению').min(8, 'Минимальная длина пароля 8 символов'),
});

export interface FormValues extends Options {
  email: string;
  password: string;
}
interface AuthFormI {
  addToken: (payload: string) => void;
}

const AuthForm: React.FC<AuthFormI> = ({ addToken }) => {
  const history = useHistory();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<Pick<FormValues, 'email' | 'password'>>({ resolver: yupResolver(schema), mode: 'onTouched' });
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const classes = useStyles();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await ky.post('http://127.0.0.1:5000/api/auth/login/', {
        json: {
          ...data,
        },
      });

      if (response.ok) {
        const token: { access_token: string } = await response.json();
        addToken(token.access_token);
        history.push('/dashboard');
      }
    } catch (e) {
      console.log(e);
      console.log('bad request', e);
    }
  };

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

        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="Пароль"
              error={Boolean(errors.password?.message)}
              helperText={errors.password?.message}
              className={classes.authFormInput}
              type="password"
              size="medium"
              {...field}
            />
          )}
        />
      </fieldset>
      <Link component={RouterLink} to="/reset_password">
        Забыли пароль?
      </Link>
      <Button className={classes.authFormButton} type="submit">
        Войти
      </Button>
    </form>
  );
};

export default AuthForm;
