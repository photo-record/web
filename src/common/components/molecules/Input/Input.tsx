import * as Svgs from '@assets/svgs';

import React, { FunctionComponent, HTMLProps } from 'react';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

export interface InputLayoutProps {
  title?: string;
}

const Input: FunctionComponent<InputProps> = ({ title, ...props }) => {
  const navigate = useNavigate();
  return (
    <div className={cx('input-container')}>
      {title && <div className={cx('title-container')}>{title}</div>}
      <input {...props} />
    </div>
  );
};

export default Input;
export interface InputProps extends HTMLProps<HTMLInputElement>, InputLayoutProps {}
