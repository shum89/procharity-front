import React from 'react';

interface ButtonProps {
  title: string;
  type: JSX.IntrinsicElements['button']['type'];
  disabled: boolean;
  classes?: string;
}

const Button: React.FC<ButtonProps & JSX.IntrinsicElements['button']> = ({
  type = 'button',
  title,
  disabled,
  classes,
}) => (
  <button
    className={`button ${classes}`}
    // eslint-disable-next-line react/button-has-type
    type={type}
    disabled={disabled}>
    {title}
  </button>
);

export default Button;
