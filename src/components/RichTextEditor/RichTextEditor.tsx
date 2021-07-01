/* eslint-disable no-console */
import React, { useState } from 'react';
import { Button, CircularProgress, Collapse, IconButton } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import ky from 'ky';
import useStyles from './RichTextEditor.style';

export interface FormValues {
  message: string;
}
const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link'],
  ],
  clipboard: {
    matchVisual: true,
  },
};

const RichTextEditor: React.FC = () => {
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const { handleSubmit, control } = useForm<FormValues>();
  const onSubmit = async (data: FormValues) => {
    const stripTags = data.message.replace(/(<p[^>]+?>|<p>|<\/p>)/gim, '');
    const replaceBtag = stripTags.replace(/<br ?\/?>/g, '\n');
    const normalizedData = { message: replaceBtag };
    try {
      setLoading(true);
      const response = await ky.post('http://127.0.0.1:5000/api/v1/send_telegram_notification/', {
        json: {
          ...normalizedData,
        },
        throwHttpErrors: false,
      });
      if (response.ok) {
        setOpen(true);
        const result = await response.json();
        setErrorMessage(result.message);
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (e: any) {
      setOpen(true);
      setErrorMessage(e.message);
    } finally {
      setLoading(false);
    }

    // try {
    //   const response = await fetch('http://127.0.0.1:5000//api/v1/send_telegram_notification/', {
    //     method: 'POST',
    //     body: JSON.stringify({ message: data.message, has_mailing: true }),
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${localStorage.getItem('user')}`,
    //     },
    //   });

    //   if (response.ok) {
    //     console.log(response);
    //   }
    // } catch (e) {
    //   console.log(e);
    //   console.log('bad request', e);
    // }
  };

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Collapse in={open} className={classes.statusInfo}>
            <Alert
              severity={errorMessage ? 'error' : 'success'}
              variant="outlined"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}>
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }>
              {errorMessage || 'Ваше сообщение успешно отправлено'}
            </Alert>
          </Collapse>
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
        </>
      )}
    </>
  );
};

export default RichTextEditor;
