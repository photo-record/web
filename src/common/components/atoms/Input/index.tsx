import React, { FunctionComponent } from 'react';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

export interface InputLayoutProps {
  type?: 'text' | string;
  placeholder?: string;
  error?: string;
  isNumeric?: boolean;
  maxLen?: number;
  minLen?: number;
  className?: string;
  value: string;
  label?: string;
  onChange: (text: string) => void;
}
function digit_check(evt) {
  const code = evt.which ? evt.which : evt.keyCode;

  if ((code < 48 || code > 57) && code !== 8 && code !== 9) {
    evt.preventDefault();
    return false;
  }

  return true;
}
const Input: FunctionComponent<InputProps> = ({
  isNumeric,
  value,
  placeholder,
  type,
  onChange,
  error,
  maxLen,
  minLen,
  className,
  label,
  ...props
}) => {
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  return (
    <div className={cx('input-container', className)}>
      <div className={cx('input-wrapper')}>
        <input
          {...props}
          autoComplete="none"
          className={cx('input')}
          type={type}
          placeholder={placeholder ?? ''}
          onChange={changeHandler}
          value={value}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => isNumeric && digit_check(e)}
          maxLength={maxLen}
          minLength={minLen}
        />
        <div className={cx('label-wrapper')}>{label}</div>
      </div>
      {error && <div className={cx('error')}>{error}</div>}
    </div>
  );
};

export default Input;
export type InputProps = InputLayoutProps; //, HTMLProps<HTMLInputElement>
