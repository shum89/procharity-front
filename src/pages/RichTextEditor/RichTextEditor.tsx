/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { Button, CircularProgress, Collapse, IconButton } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from './RichTextEditor.style';

export interface RichTextEditorFormValues {
  message: string;
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
