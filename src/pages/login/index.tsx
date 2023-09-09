import * as A from '@components/atoms';
import * as Svgs from '@assets/svgs';

import React, { useEffect, useState } from 'react';

import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';

const { Kakao } = window;
const cx = classNames.bind(styles);
function Login() {
  interface UserInfoType {
    [index: string]: string; //HTMLElement; //React.ReactNode;
  }
  const navigate = useNavigate();
  const [token, setToken] = useState<string>('');
  const [userInfo, setUserInfo] = useState<UserInfoType | undefined>(undefined);
  const params = new URL(document.location.toString()).searchParams;
  const code = params.get('code');
  console.log(token, userInfo);
  useEffect(() => {
    async function kakaoLoginLogic() {
      const grant_type = 'authorization_code';
      const client_id = process.env.REACT_APP_KAKAO_CLIENT_ID;
      try {
        await axios
          .post(
            `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${window.location.origin}/login&code=${code}`,
            {
              headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
              },
            },
          )
          .then((res) => {
            console.log(res);
            setToken(res?.data?.access_token ?? '');
            Kakao.Auth.setAccessToken(res.data.access_token);
            Kakao.API.request({
              url: '/v2/user/me',
              success: function (response: any) {
                console.log(response);
                setUserInfo(response?.kakao_account);
                navigate('/join');
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
      redirectUri: `${window.location.origin}/login`,
      scope: 'gender,birthday,age_range,account_email',
    });
  };
  return (
    <div className={cx('login-container')}>
      <div>잘사니 로그인 페이지입니다.</div>
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
export default Login;
export const path = '/login';
