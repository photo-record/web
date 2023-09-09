import { IcHome, IcList, IcMeet, IcMeetActive, IcMypage } from '@assets/svgs';
import { Link, useLocation } from 'react-router-dom';
import React, { FunctionComponent, HTMLProps } from 'react';

//useNavigate
import classNames from 'classnames/bind';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

export interface AppbarLayoutProps {
  title?: string;
  leftButtonRender?: () => JSX.Element;
  rightButtonRender?: () => JSX.Element;
  noBorder?: boolean;
}

const BottomAppbar: FunctionComponent<AppbarProps> = () => {
  // const navigate = useNavigate();
  const { pathname } = useLocation();
  const showBar = [
    /^\/test/,
    /^\/guestbook/,
    /^\/guestbook\/[0-9]+$/g,
    /^\/potal/,
    /^\/meet/,
    /^\/meet\/create/,
    /^\/meet\/[0-9]+$/g,
  ];

  if (!showBar?.some((reg) => new RegExp(reg).test(pathname))) return <></>;
  return (
    <div className={cx('appbar-container')}>
      <div className={cx('appbar-container-fix')}>
        <Link to="/potal" className={cx(pathname.startsWith('/potal') && 'active')}>
          <IcHome />홈
        </Link>
        <Link to="#" className={cx(pathname.startsWith('/guestbook') && 'active')}>
          <IcList />
          방명록
        </Link>
        <Link to="/meet" className={cx(pathname.startsWith('/meet') && 'active')}>
          {pathname.startsWith('/meet') ? <IcMeetActive /> : <IcMeet />}
          모임
        </Link>
        <Link to="/mypage/detail" className={cx(pathname.startsWith('/mypage') && 'active')}>
          <IcMypage />
          마이페이지
        </Link>
      </div>
    </div>
  );
};

export default BottomAppbar;
export interface AppbarProps extends HTMLProps<HTMLDivElement>, AppbarLayoutProps {}
