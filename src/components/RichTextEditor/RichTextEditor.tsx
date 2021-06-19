import React from 'react';
import { Button } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useStyles from './RichTextEditor.style';

export interface FormValues {
  text: string;
}
const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
};

const RichTextEditor: React.FC = () => {
  const classes = useStyles();
  const { handleSubmit, control } = useForm<FormValues>();
  const onSubmit = (data: FormValues) => {
    // eslint-disable-next-line no-console
    alert(JSON.stringify(data));
  };
  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="text"
        control={control}
        defaultValue=""
        render={({ field }) => <ReactQuill modules={modules} theme="snow" {...field} />}
      />
      <Button className={classes.authFormButton} type="submit">
        Отправить
      </Button>
    </form>
  );
};

export default RichTextEditor;
