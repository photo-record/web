import Axios from 'axios';

class Ajax {
  static baseURL = 'https://api-photo-record.project-hh.com/';
  static axios(options = {}) {
    let instance = Axios.create({
      baseURL: Ajax.baseURL,
      timeout: 50000,
      headers: (() => {
        const headers = {
          Accept: '*/*',
          'Content-Type': 'application/json',
        };

        if (localStorage.getItem('accessToken')) {
          headers['X-User-Token'] = localStorage.getItem('accessToken');
        }
        return headers;
      })(),
      ...options,
    });

    instance.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        console.error({ error });
        if ((error?.response?.data?.message ?? error.message).includes('탈퇴')) {
          localStorage?.clear();
          window.location.href = window.location.href;
        }
        if (error.message.includes('timeout') || error?.response?.status === 504) {
          window.alert('시간이 초과되었습니다.');
        }

        if (error?.response?.status === 403) {
          alert('로그인 정보가 변경되었습니다. 로그인 페이지로 이동합니다.');
          localStorage.setItem('accessToken', '');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      },
    );
    return instance;
  }
}
export default Ajax.axios;
