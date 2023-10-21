import * as A from '@components/atoms';
import * as Svgs from '@assets/svgs';

import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { login } from '@modules/post';

const cx = classNames.bind(styles);
const { Kakao } = window;
function Login() {
  const navigate = useNavigate();
  const params = new URL(document.location.toString()).searchParams;
  const code = params.get('code');
  const redirectTo = params.get('redirect');

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
            Kakao.Auth.setAccessToken(res.data.access_token);
            Kakao.API.request({
              url: '/v2/user/me',
              success: async function (response: any) {
                const result = await login({ email: response?.kakao_account?.email });
                localStorage.setItem('accessToken', result?.accessToken);
                if (result?.isNewUser === true) {
                  navigate('/join', {
                    replace: true,
                  });
                } else {
                  const redirecturl = sessionStorage.getItem('redirectTo');
                  sessionStorage?.removeItem('redirectTo');
                  navigate(!!redirecturl ? redirecturl : '/', {
                    replace: true,
                  });
                }
              },
              fail: function (error: any) {
                console.error({ error });
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

  useEffect(() => {
    if (redirectTo?.length > 0) {
      sessionStorage.setItem('redirectTo', redirectTo);
    }
  }, [redirectTo]);

  const loginWithKakao = () => {
    Kakao.Auth.authorize({
      redirectUri: `${window.location.origin}/login`,
      scope: 'gender,birthday,age_range,account_email',
    });
  };
  return (
    <div className={cx('main-container')}>
      <div>
        <div className={cx('main-content', 'title1MD')}>
          함께 혹은 혼자 찍은 사진을 기록해요
          <span>PHOTO RECORD</span>
        </div>
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
export default Login;
export const path = '/login';
