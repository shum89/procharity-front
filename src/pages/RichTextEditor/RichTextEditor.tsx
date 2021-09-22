import React from 'react';
import { Button, CircularProgress, FormControlLabel, Radio, RadioGroup, Typography } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import useStyles from './RichTextEditor.style';
import StatusLabel from '../../components/StatusLabel/StatusLabel';
import { useAsync } from '../../hooks/useAsync';

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
  const { handleSubmit, control, reset } = useForm<RichTextEditorFormValues>();
  const { data, error, run, isError, setError, setData, isLoading } = useAsync({
    data: null,
    error: null,
  });

 const statusMessage = isError ? (error as string) : ((data?.result ?? '') as string); 

  const isStatusLabelOpen = Boolean(error) || Boolean(data?.result);
  const handleResetLabel = () => {
    if (isError) {
      setError(null);
      return;
    }
    setData(null);
  };
  return (
    <form
      className={classes.form}
      onSubmit={handleSubmit((dataS, e) => {
        run(onSubmit(dataS));
        reset({ message: '' });
      })}>
      <Typography variant="h4">Отправить сообщение пользователям</Typography>
      <StatusLabel
        isStatusLabelOpen={isStatusLabelOpen}
        statusMessage={statusMessage}
        isError={isError}
        handleCloseError={handleResetLabel}
      />
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
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Button className={classes.authFormButton} type="submit">
          отправить
        </Button>
      )}
    </form>
  );
};

export default RichTextEditor;
