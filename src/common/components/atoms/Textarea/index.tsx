import React, { FunctionComponent, HTMLProps } from 'react';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

export interface TextareaLayoutProps {
  placeholder?: string;
  error?: string;
  minLen?: number;
  maxLen?: number;
  className?: string;
}

const Textarea: FunctionComponent<TextareaProps> = ({
  value,
  placeholder,
  onChange,
  error,
  minLen,
  maxLen,
  className,
  ...props
}) => {
  return (
    <div className={cx('textarea-wrapper')}>
      <textarea
        {...props}
        className={cx('textarea', className)}
        placeholder={placeholder ?? ''}
        onChange={onChange}
        value={value}
        minLength={minLen}
        maxLength={maxLen}
      />
      {error && <div className={cx('error')}>{error}</div>}
    </div>
  );
};

export default Textarea;
export interface TextareaProps extends HTMLProps<HTMLTextAreaElement>, TextareaLayoutProps {}
