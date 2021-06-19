/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { TextField, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { SectionComponent } from '../SectionComponent/SectionComponent';
import useStyles from './AuthForm.styles';

const schema = yup.object().shape({
  email: yup.string().email('Такой e-mail не подойдет').required('Поле e-mail необходимо к заполнению'),
  password: yup.string().required('Поле пароль необходимо к заполнению').min(8, 'Минимальная длина пароля 8 символов'),
});

export interface FormValues {
  email: string;
  password: string;
}

export default function AuthForm() {
  const history = useHistory();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormValues>({ resolver: yupResolver(schema), mode: 'onTouched' });
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const classes = useStyles();
  const onSubmit = (data: FormValues) => {
    alert(JSON.stringify(data));
    if (isValid) {
      history.push('/dashboard');
    }
  };

  return (
    <SectionComponent title="Добро Пожаловать">
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

        <Button className={classes.authFormButton} type="submit">
          Войти
        </Button>
      </form>
    </SectionComponent>
  );
}
