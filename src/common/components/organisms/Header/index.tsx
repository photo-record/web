import React, { FunctionComponent, HTMLProps } from 'react';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

export interface HeaderLayoutProps {
  title?: string;
}

const Header: FunctionComponent<HeaderProps> = ({ title }) => {
  const { pathname } = useLocation();
  switch (pathname) {
    case '/login':
      return <></>;
  }
  return (
    <div className={cx('header-container')}>
      <div className={cx('header-wrapper')}>{title ?? 'PHOTO RECORD'}</div>
    </div>
  );
};

export default Header;
export interface HeaderProps extends HTMLProps<HTMLDivElement>, HeaderLayoutProps {}
