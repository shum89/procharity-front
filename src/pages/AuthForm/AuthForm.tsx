import React, { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { TextField, Button, Link, IconButton, InputAdornment } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import useStyles from './AuthForm.styles';

const schema = yup.object().shape({
  email: yup.string().email('Такой e-mail не подойдет').required('Поле e-mail необходимо к заполнению'),
  password: yup.string().required('Поле пароль необходимо к заполнению').min(8, 'Минимальная длина пароля 8 символов'),
});

export interface LoginFormValues {
  email: string;
  password: string;
}
interface AuthFormI {
  onLogin: (data: LoginFormValues) => Promise<void>;
}

const AuthForm: React.FC<AuthFormI> = ({ onLogin }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Pick<LoginFormValues, 'email' | 'password'>>({ resolver: yupResolver(schema), mode: 'onTouched' });

  const classes = useStyles();

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const handleClickShowPassword = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const onSubmit = async (data: LoginFormValues) => {
    onLogin(data);
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
              type={isPasswordVisible ? 'text' : 'password'}
              size="medium"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}>
                      {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
