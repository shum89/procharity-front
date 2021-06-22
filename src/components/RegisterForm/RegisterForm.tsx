/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { TextField, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ky, { Options } from 'ky';
import useStyles from './RegisterForm.styles';

const schema = yup.object().shape({
  username: yup.string().email('Такой e-mail не подойдет').required('Поле e-mail необходимо к заполнению'),
  password: yup
    .string()
    .required('Поле пароль необходимо к заполнению')
    .min(8, 'Минимальная длина пароля 8 символов')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*)(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number',
    ),
});

export interface FormValues extends Options {
  username: string;
  password: string;
}

export default function AuthForm() {
  const history = useHistory();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<Pick<FormValues, 'username' | 'password'>>({ resolver: yupResolver(schema), mode: 'onTouched' });
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
        console.log(await response.json());
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
          name="username"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              label="E-mail"
              error={Boolean(errors.username?.message)}
              helperText={errors.username?.message}
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

      <Button className={classes.authFormButton} type="submit">
        Войти
      </Button>
    </form>
  );
}
