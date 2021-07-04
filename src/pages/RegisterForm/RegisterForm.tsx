/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { TextField, Button, Typography, Link, IconButton, InputAdornment } from '@material-ui/core';
import { useHistory, useParams, Link as RouterLink } from 'react-router-dom';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import ky, { Options } from 'ky';
import useStyles from './RegisterForm.styles';

const schema = yup.object().shape({
  last_name: yup.string().required('Поле Имя необходимо к заполнению'),
  first_name: yup.string().required('Поле Фамилия необходимо к заполнению'),
  password: yup
    .string()
    .required('Поле пароль необходимо к заполнению')
    .min(8, 'Минимальная длина пароля 8 символов')
    .matches(/(?=.*\d)(?=.*[a-zа-я])(?=.*[A-ZА-Я])/g, 'Пароль должен содержать 1 цифру, 1 заглавную букву, 1 строчную'),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
});

const paramsSchema = yup.object().shape({
  id: yup.string().uuid(),
});

export interface RegisterFormValues extends Options {
  first_name: string;
  last_name: string;
  password: string;
  passwordConfirmation?: string;
}
interface RegisterFormProps {
  onSubmit: (data: RegisterFormValues, params: { id: string }) => Promise<void>;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const history = useHistory();
  const password = useRef({});

  const params = useParams<{ id: string }>();
  const [isInviteValid, setInviteValid] = useState(true);

  useEffect(() => {
    const handleTokenValidity = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const response = await ky.post(`${process.env.REACT_APP_API_ADDRESS}/auth/invitation_checker/`, {
          json: {
            token: params.id,
          },
        });
      } catch {
        setInviteValid(false);
      }
    };
    handleTokenValidity();
    paramsSchema.validate(params).catch(() => history.push('/'));
  }, []);

  const {
    handleSubmit,
    control,
    watch,
    getValues,
    formState: { errors },
  } = useForm<Pick<RegisterFormValues, 'first_name' | 'password' | 'last_name' | 'passwordConfirmation'>>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });
  password.current = watch('password', '');
  const submitRegisterForm = (data: RegisterFormValues) => {
    onSubmit(data, params);
  };
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const handleClickShowPassword = () => {
    setPasswordVisible(!isPasswordVisible);
  };
  const classes = useStyles();

  return isInviteValid ? (
    <form className={classes.authForm} onSubmit={handleSubmit(submitRegisterForm)}>
      <fieldset className={classes.authFormInputContainer}>
        <Controller
          name="first_name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              label="Имя"
              fullWidth
              error={Boolean(errors.first_name?.message)}
              helperText={errors.first_name?.message}
              className={classes.authFormInput}
              size="medium"
              variant="outlined"
              {...field}
            />
          )}
        />
        <Controller
          name="last_name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              label="Фамилия"
              error={Boolean(errors.last_name?.message)}
              helperText={errors.last_name?.message}
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
        <Controller
          name="passwordConfirmation"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="Повторите пароль"
              error={Boolean(errors.passwordConfirmation?.message)}
              helperText={errors.passwordConfirmation?.message}
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

      <Button className={classes.authFormButton} type="submit">
        Зарегистрироваться
      </Button>
    </form>
  ) : (
    <div className={classes.authFormRegisterError}>
      <Typography variant="h4">Ссылка устарела или не существует</Typography>
      <Link component={RouterLink} to="/">
        Вернуться на главную
      </Link>
    </div>
  );
};

export default RegisterForm;
