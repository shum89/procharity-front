import clsx from 'clsx';
import React from 'react';
import { RefCallBack } from 'react-hook-form';
import { FormValues } from '../AuthForm/AuthForm';

export interface CustomInputProps {
  type: string;
  id: keyof FormValues;
  labelTitle?: string;
  onClick?: any;
  ref: RefCallBack;
  isSelected?: boolean;
  value?: any;
  disabled: boolean;
  component?: React.ReactNode;
}

export const CustomInput: React.FC<CustomInputProps> = ({ ref, type, id, labelTitle, children, onClick, disabled }) => (
  <div>
    <label
      className={clsx('custom-input__input-label', {
        // 'custom-input__input-label_active': meta.active,
        // 'custom-input__input-label_fill': input.value && !meta.active,
      })}
      htmlFor={id}>
      {labelTitle}
    </label>
    <input ref={ref} onClick={onClick} disabled={disabled} id={id} className="custom-input__input" type={type} />)
    {children}
  </div>
);

export default CustomInput;
