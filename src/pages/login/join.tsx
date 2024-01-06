import * as M from '@components/molecules';

import React, { useEffect, useState } from 'react';
import { numberToDate, numberToPhoneNumber } from '@utils/format';

import Input from '@common/components/molecules/Input/Input';
import LabelRadioButton from '@common/components/molecules/LabelRadioButton';
import classNames from 'classnames/bind';
import moment from 'moment';
import styles from './styles.module.scss';
import { updateUser } from '@modules/put';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
function Join() {
  interface userInfoType {
    name?: string;
    phoneNumber?: string;
    gender?: string;
    birthday?: string;
  }
  interface userInfoListType {
    id?: number;
    title?: string;
    type?: string;
    key?: string;
    error?: string;
  }

  const navigate = useNavigate();
  const [valid, setValid] = useState<boolean>(false);
  const [values, setValues] = useState<userInfoType>({
    name: '',
    phoneNumber: '',
    gender: 'male',
    birthday: '',
  });
  const [userInfo, setUserInfo] = useState<userInfoListType[]>([
    {
      id: 1,
      title: '이름을 입력해주세요.',
      key: 'name',
      type: 'input',
    },
    {
      id: 2,
      title: '전화번호를 입력해주세요.',
      key: 'phoneNumber',
      type: 'numberInput',
    },
    {
      id: 3,
      title: '성별을 선택해주세요.',
      key: 'gender',
      type: 'genderCheckbox',
    },
    {
      id: 4,
      title: '생년월일을 선택해주세요.',
      key: 'birthday',
      type: 'birthday',
    },
  ]);

  function handleChange(key: string, value: string) {
    setValues({ ...values, [key]: value });
    if (key === 'birthday') {
      const regex = /\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])/g;
      const userInfoTemp = userInfo;
      if (!regex.test(numberToDate(value))) {
        userInfoTemp[3].error = '올바른 날짜를 입력해주세요.';
      } else if (moment(value) > moment()) {
        userInfoTemp[3].error = '오늘 이전의 날짜를 입력해주세요.';
      } else {
        userInfoTemp[3].error = '';
      }
      setUserInfo(userInfoTemp);
    }
  }
  function handleValid({ isSubmit = false }) {
    const userInfoTemp = JSON.parse(JSON.stringify(userInfo));
    let isValidTemp = true;

    if (values.name === '') {
      userInfoTemp[0].error = '이름을 입력해주세요.';
      isValidTemp = false;
    }

    if (values.phoneNumber === '') {
      userInfoTemp[1].error = '전화번호를 입력해주세요.';
      isValidTemp = false;
    } else if (values.phoneNumber?.length < 11) {
      userInfoTemp[1].error = '올바른 전화번호를 입력해주세요.';
      isValidTemp = false;
    }

    if (values?.birthday === '') {
      userInfoTemp[3].error = '생년월일을 입력해주세요.';
      isValidTemp = false;
    } else if (userInfo[3].error?.length > 0) {
      isValidTemp = false;
    }

    if (!isValidTemp && isSubmit === true) {
      setUserInfo(userInfoTemp);
    }

    return isValidTemp;
  }

  useEffect(() => {
    setValid(handleValid({ isSubmit: false }));
  }, [values]);

  async function handleSubmit() {
    if (handleValid({ isSubmit: true })) {
      try {
        await updateUser(values);
        window.alert('👏👏가입이 완료되었습니다.👏👏');
        navigate('/');
      } catch (e) {
        window.alert(`가입이 완료되지 않았습니다.\n-에러: ${JSON.stringify(e)}`);
      }
    }
  }
  return (
    <div className={cx('signup-container')}>
      {userInfo?.map((q) => {
        return (
          <div className={cx('form-container')}>
            <div className={cx('form-title', 'title2BD')}>{q.title}</div>
            {q.type === 'input' && (
              <Input
                placeholder={''}
                value={values[q.key]}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  handleChange(q.key, e?.currentTarget?.value);
                  const userInfoTemp = [...userInfo];
                  userInfoTemp[q.id - 1].error = '';
                  setUserInfo(userInfoTemp);
                }}
                maxLength={20}
              />
            )}
            {q.type === 'numberInput' && (
              <Input
                placeholder={''}
                value={
                  values[q.key].replace(/[^0-9]/g, '')
                    ? numberToPhoneNumber(values[q.key].replace(/[^0-9]/g, ''))
                    : ''
                }
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  handleChange(
                    q.key,
                    (e?.currentTarget?.value).replace(/[^0-9]/g, '').slice(0, 11),
                  );
                  const userInfoTemp = [...userInfo];
                  userInfoTemp[q.id - 1].error = '';
                  setUserInfo(userInfoTemp);
                }}
              />
            )}
            {q.type === 'genderCheckbox' && (
              <div className={cx('radio')}>
                <LabelRadioButton
                  name="gender"
                  value="남"
                  checked={values.gender === 'male'}
                  onChange={() => handleChange(q.key, 'male')} //checked 변경 핸들러
                />
                <LabelRadioButton
                  name="gender"
                  value="여"
                  checked={values.gender === 'female'}
                  onChange={() => handleChange(q.key, 'female')} ///checked 변경 핸들러
                />
              </div>
            )}
            {q.type === 'birthday' && (
              <Input
                placeholder={'ex) 19991231'}
                value={numberToDate(values[q.key])}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  const valueNumber = (e?.currentTarget?.value).replace(/[^0-9]/g, '');
                  handleChange(q.key, valueNumber);
                }}
              />
            )}
            <div className={cx('form-error', 'captionMD')}>{q.error}</div>
          </div>
        );
      })}
      <div className={cx('bottom-wrapper')}>
        <button
          className={cx('start-button', !valid && 'start-button-disabled', 'title2BD')}
          onClick={handleSubmit}
        >
          시작하기
        </button>
      </div>
    </div>
  );
}
export default Join;
export const path = '/join';
