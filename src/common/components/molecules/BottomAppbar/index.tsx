import {
  IcHome,
  IcHomeActive,
  IcMeet,
  IcMeetActive,
  IcMypage,
  IcProfile,
  IcProfileActive,
} from '@assets/svgs';
import { Link, useLocation } from 'react-router-dom';
import React, { FunctionComponent, HTMLProps } from 'react';

//useNavigate
import classNames from 'classnames/bind';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

const BottomAppbar: FunctionComponent = () => {
  // const navigate = useNavigate();
  const { pathname } = useLocation();
  const hideBar = [/^\/login/, /^\/create/, /^\/join/];

  if (hideBar?.some((reg) => new RegExp(reg).test(pathname)) || !localStorage.accessToken)
    return <></>;
  return (
    <div className={cx('appbar-container')}>
      <div className={cx('appbar-container-fix')}>
        <div className={cx('background')} />
        <Link to="/home" className={cx(pathname.startsWith('/home') && 'active')}>
          {pathname.startsWith('/home') ? <IcHomeActive /> : <IcHome />}
        </Link>
        <Link
          to="create"
          className={cx('create-btn', 'headline1BD', pathname.startsWith('/create') && 'active')}
        >
          +
        </Link>
        <Link to="/mypage" className={cx(pathname.startsWith('/mypage') && 'active')}>
          {pathname.startsWith('/mypage') ? <IcProfileActive /> : <IcProfile />}
        </Link>
      </div>
    </div>
  );
};

export default BottomAppbar;
