/* eslint-disable no-console */
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField, Link } from '@material-ui/core';
import * as yup from 'yup';
import { Options } from 'ky';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useHistory, Link as RouterLink } from 'react-router-dom';
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
const ResetPassword: React.FC<InviteProps> = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Pick<FormValues, 'email'>>({ resolver: yupResolver(schema), mode: 'onTouched' });
  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch('http://127.0.0.1:5000//api/auth/password_reset/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      });
      // const response = await ky.post('http://127.0.0.1:5000/api/auth/Invitation', {
      //   json: {
      //     ...data,
      //   },
      // });

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
