import * as Svgs from '@assets/svgs';

import React, { FunctionComponent, HTMLProps, useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

export interface InputLayoutProps {
  title?: string;
}

const CalendarInput: FunctionComponent<InputProps> = ({ title, ...props }) => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(props.value);
  }, [props.value]);
  return (
    <div className={cx('input-container', 'calendar-input-container')}>
      {title && <div className={cx('title-container')}>{title}</div>}
      <input {...props} />
    </div>
  );
};

export default CalendarInput;
export interface InputProps extends HTMLProps<HTMLInputElement>, InputLayoutProps {}
