/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { TextField, Button, Typography } from '@material-ui/core';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import ky, { Options } from 'ky';
import useStyles from './RegisterForm.styles';

const schema = yup.object().shape({
  last_name: yup.string().required('Поле e-mail необходимо к заполнению'),
  first_name: yup.string().required(),
  password: yup.string().required('Поле пароль необходимо к заполнению').min(8, 'Минимальная длина пароля 8 символов'),
});

const paramsSchema = yup.object().shape({
  id: yup.string().uuid(),
});

export interface RegisterFormValues extends Options {
  first_name: string;
  last_name: string;
  password: string;
}
interface RegisterFormProps {
  onSubmit: (data: RegisterFormValues, params: { id: string }) => Promise<void>;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const history = useHistory();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    const handleTokenValidity = async () => {
      try {
        const response = await ky.post(`${process.env.REACT_APP_API_ADDRESS}/auth/invitation_checker/`, {
          json: {
            token: params.id,
          },
        });
      } catch {
        history.push('/');
      }
    };
    handleTokenValidity();
    paramsSchema.validate(params).catch(() => history.push('/'));
  }, []);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<Pick<RegisterFormValues, 'first_name' | 'password' | 'last_name'>>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });
  const submitRegisterForm = (data: RegisterFormValues) => {
    onSubmit(data, params);
  };
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const classes = useStyles();

  return (
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
        Зарегистрироваться
      </Button>
    </form>
  );
};

export default RegisterForm;
