// import * as A from '@components/atoms';

import React from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
function Home() {
  const navigate = useNavigate();
  return (
    <div className={cx('main-container', 'main-no-img')}>
      <div className={cx('main-content')}>
        <div>
          아직 등록된 사진이 없어요
          <br />
          사진을 등록해보세요!
        </div>
        <button
          onClick={() => {
            navigate('/create');
          }}
        >
          등록하러 가기
        </button>
      </div>
    </div>
  );
}
export default Home;
export const path = '/';
export const loginRequired = true;
