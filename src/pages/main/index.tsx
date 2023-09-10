import * as A from '@components/atoms';
import * as Svgs from '@assets/svgs';

import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const cx = classNames.bind(styles);
const { Kakao } = window;
function Main() {
  const navigate = useNavigate();
  const params = new URL(document.location.toString()).searchParams;
  const code = params.get('code');

  useEffect(() => {
    async function kakaoLoginLogic() {
      const grant_type = 'authorization_code';
      const client_id = process.env.REACT_APP_KAKAO_CLIENT_ID;
      console.log(
        `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${window.location.origin}/&code=${code}`,
      );
      try {
        await axios
          .post(
            `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${window.location.origin}&code=${code}`,
            {
              headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
              },
            },
          )
          .then((res) => {
            console.log(res);
            Kakao.Auth.setAccessToken(res.data.access_token);
            Kakao.API.request({
              url: '/v2/user/me',
              success: function (response: any) {
                console.log(response);
                navigate('/home');
              },
              fail: function (error: any) {
                console.log(error);
              },
            });
          });
      } catch (e) {
        console.error({ e });
      }
    }
    if (!!code) {
      kakaoLoginLogic();
    }
  }, [code]);
  const loginWithKakao = () => {
    Kakao.Auth.authorize({
      redirectUri: `${window.location.origin}`,
      scope: 'gender,birthday,age_range,account_email',
    });
  };
  return (
    <div className={cx('main-container')}>
      <div>
        <div>포토레코드 메인 페이지입니다.</div>
        <div>함께 혹은 혼자 찍은 사진을 기록해요</div>
      </div>
      <A.Button
        buttonType={'default'}
        onClick={() => {
          loginWithKakao();
        }}
        className={cx('kakao-button')}
        isFull
      >
        <Svgs.IcKakao />
        카카오톡으로 시작하기
      </A.Button>
    </div>
  );
}
export default Main;
export const path = '/';
