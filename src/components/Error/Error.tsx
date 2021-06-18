import clsx from 'clsx';
import React from 'react';

interface ErrorProps {
  name: string;
  isError?: boolean;
  errorMessage?: string;
}

const Error: React.FC<ErrorProps> = ({ name, isError, errorMessage }) => {
  return isError ? (
    <span
      className={clsx('error', {
        'error_bad-request': isError,
      })}>
      {isError ? errorMessage : ''}
    </span>
  ) : null;
};

export default Error;
