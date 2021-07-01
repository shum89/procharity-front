/* eslint-disable no-console */
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField } from '@material-ui/core';
import * as yup from 'yup';
import { Options } from 'ky';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
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
  const history = useHistory();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Pick<FormValues, 'email'>>({ resolver: yupResolver(schema), mode: 'onTouched' });
  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/v1/auth/invitation/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const result = await response.json();
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
      <Button className={classes.authFormButton} type="submit">
        отправить
      </Button>
    </form>
  );
};

export default Invite;
