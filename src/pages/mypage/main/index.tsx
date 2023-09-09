import * as A from '@components/atoms';
import * as M from '@components/molecules';

import { Link, useNavigate } from 'react-router-dom';

import React from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);
function Main() {
  const navigate = useNavigate();
  console.log(navigate);
  return (
    <div className={cx('mypage-container')}>
      <M.Header title={'잘사니'} noBorder />
      <div className={cx('image-container')}>
        <div className={cx('image-wrapper')}>
          <img
            src={
              'https://images.unsplash.com/photo-1626548307930-deac221f87d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y3V0ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=100'
            }
          />
          <div className={cx('edit-icon')}></div>
        </div>
        <button className={cx('edit-image')}>사진 수정</button>
      </div>

      <div className={cx('school-info')}>
        <div className={cx('school-info-wrapper')}>
          <div className={cx('school-type')}>초등학교</div>
          <div className={cx('school-name')}>
            신우초
            <span className={cx('school-graduate-stage')}>(n기)</span>
          </div>
        </div>
        <div className={cx('school-info-wrapper')}>
          <div className={cx('school-type')}>중학교</div>
          <div className={cx('school-name')}>
            신우중
            <span className={cx('school-graduate-stage')}>(n기)</span>
          </div>
        </div>
        <div className={cx('school-info-wrapper')}>
          <div className={cx('school-type')}>고등학교</div>
          <div className={cx('school-name')}>
            신우고
            <span className={cx('school-graduate-stage')}>(n기)</span>
          </div>
        </div>
      </div>

      <A.Button buttonType={'primary'} isFull className={cx('edit-profile-btn')}>
        프로필 수정하기
      </A.Button>
      <div className={cx('link-list')}>
        <Link to="#">나의 상세정보</Link>
        <Link to="#">채팅</Link>
        <Link to="#">학교 방명록</Link>
        <Link to="#">동창목록</Link>
        <Link to="#">로그아웃</Link>
        <Link to="#">탈퇴하기</Link>
      </div>
    </div>
  );
}
export default Main;
export const loginRequire = true;
export const path = '/mypage';
