import React, { FunctionComponent, HTMLProps } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ArrowLeft } from '@assets/svgs';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

export interface HeaderLayoutProps {
  title?: string;
}

const Header: FunctionComponent<HeaderProps> = ({ title }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const showBackBtn = [/^\/create/, /^\/detail/d];
  switch (pathname) {
    case '/login':
      return <></>;
  }
  return (
    <div className={cx('header-container')}>
      <div className={cx('header-wrapper')}>
        {showBackBtn?.some((reg) => new RegExp(reg).test(pathname)) && (
          <button
            className={cx('back-button')}
            onClick={() => {
              if (window.history.length > 1) {
                navigate(-1);
              } else {
                navigate('/');
              }
            }}
          >
            <ArrowLeft />
          </button>
        )}
        {title ?? 'PHOTO RECORD'}
      </div>
    </div>
  );
};

export default Header;
export interface HeaderProps extends HTMLProps<HTMLDivElement>, HeaderLayoutProps {}
