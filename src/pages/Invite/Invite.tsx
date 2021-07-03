/* eslint-disable no-console */
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField } from '@material-ui/core';
import * as yup from 'yup';
import { Options } from 'ky';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import useStyles from '../AuthForm/AuthForm.styles';

interface InviteProps {
  children?: React.ReactNode;
  onSubmit: (data: InviteFormValues) => Promise<void>;
}

const schema = yup.object().shape({
  email: yup.string().email('Такой e-mail не подойдет').required('Поле e-mail необходимо к заполнению'),
});

export interface InviteFormValues extends Options {
  email: string;
}
const Invite: React.FC<InviteProps> = ({ onSubmit }) => {
  const classes = useStyles();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Pick<InviteFormValues, 'email'>>({ resolver: yupResolver(schema), mode: 'onTouched' });

  return (
    <div className={classes.invite}>
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
    </div>
  );
};

export default Invite;
