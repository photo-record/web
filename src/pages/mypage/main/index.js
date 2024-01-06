import * as A from '@components/atoms';
import * as M from '@components/molecules';

import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { ReactComponent as SvgCamera } from '@assets/svgs/camera.svg';
import classNames from 'classnames/bind';
import { getMy } from '@modules/get';
import styles from './styles.module.scss';
import { updateUser } from '@modules/put';

const cx = classNames.bind(styles);
function Main() {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchUser() {
      try {
        const result = await getMy();
        setUserInfo(result);
      } catch (e) {
        console.error({ e });
      }
    }
    fetchUser();
  }, []);
  return (
    <div className={cx('mypage-container')}>
      <div
        className={cx('section-container')}
        // style={{ paddingLeft: '20px', paddingright: '20px' }}
      >
        <div className={cx('image-container')}>
          <img
            src={userInfo?.profileImage ?? require('@assets/profile.png')}
            alt="profile icon"
            className={cx('profile-icon')}
          />
          {/* <div className={cx('camera-icon')}> */}
          <M.ImageUploadButton
            className={cx('camera-icon')}
            onUploaded={(url) => {
              setUserInfo({ ...userInfo, ['profileImage']: url });
              updateUser({ profileImage: url });
            }}
            renderButton={() => <SvgCamera />}
            pathType={'profile'}
          />
          {/* </div> */}
        </div>
        <h2 className={cx('headline3BD', 'name')}>{userInfo?.name}</h2>
      </div>
      <div className={cx('section-container', 'menu-container')}>
        <div
          onClick={() => {
            // navigate('/join');
          }}
          className={cx('menu-btn', 'title2MD')}
        >
          정보 수정하기
        </div>
        <div
          onClick={() => {
            localStorage.clear();
            navigate('/login');
          }}
          className={cx('menu-btn', 'title2MD')}
        >
          로그아웃
        </div>
        {/* <div
          onClick={() => {
            return;
          }}
        >
          탈퇴하기
        </div> */}
      </div>
    </div>
  );
}
export default Main;
export const loginRequire = true;
export const path = '/mypage';
