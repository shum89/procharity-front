/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  Collapse,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useStyles from './RichTextEditor.style';

export interface RichTextEditorFormValues {
  message: string;
  has_mailing: string;
}

const modules = {
  toolbar: [['bold', 'italic', 'underline', 'strike'], ['link']],
  clipboard: {
    matchVisual: false,
  },
};

interface RichTextEditorInterface {
  onSubmit: (data: RichTextEditorFormValues) => Promise<void>;
}

const RichTextEditor: React.FC<RichTextEditorInterface> = ({ onSubmit }) => {
  const classes = useStyles();
  const { handleSubmit, control } = useForm<RichTextEditorFormValues>();

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <Typography className={classes.title}>Выберите вариант отправки сообщения</Typography>
      <Controller
        defaultValue="subscribed"
        render={({ field }) => (
          <RadioGroup className={classes.radioButtonGroup} aria-label="Mailing" {...field}>
            <FormControlLabel value="subscribed" control={<Radio />} label="Уведомления включены" />
            <FormControlLabel value="unsubscribed" control={<Radio />} label="Уведомления выключены" />
            <FormControlLabel value="all" control={<Radio />} label="Всем" />
          </RadioGroup>
        )}
        name="has_mailing"
        control={control}
      />
      <Controller
        name="message"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <ReactQuill preserveWhitespace className={classes.quill} modules={modules} theme="snow" {...field} />
        )}
      />
      <Button className={classes.authFormButton} type="submit">
        Отправить
      </Button>
    </form>
  );
};

export default RichTextEditor;
