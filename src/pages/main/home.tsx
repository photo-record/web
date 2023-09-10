import * as A from '@components/atoms';

import React from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
function Home() {
  const navigate = useNavigate();
  return (
    <div className={cx('main-container')}>
      <button>포토레코드 홈 페이지입니다.</button>
    </div>
  );
}
export default Home;
export const path = '/home';
