import * as A from '@components/atoms';
import * as M from '@components/molecules';

import React, { useState } from 'react';

import classNames from 'classnames/bind';
import { numberToPhoneNumber } from '@utils/format';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
function Join() {
  interface phoneInfoType {
    number: string;
    authNumber: string;
    getAuthNumber: boolean;
    isValid: boolean;
  }
  interface formDataType {
    question: string;
    isRequired: boolean;
    value: string;
  }
  interface userInfoListType {
    id: number;
    skippable?: boolean;
    title: string;
    subTitle?: string;
    formData: formDataType[];
  }

  const navigate = useNavigate();

  const [phoneInfo, setPhoneInfo] = useState<phoneInfoType>({
    number: '',
    authNumber: '',
    getAuthNumber: false,
    isValid: false,
  });
  const [userInfoStep, setUserInfoStep] = useState<userInfoListType>();
  const [userInfo, setUserInfo] = useState<userInfoListType[]>([
    {
      id: 1,
      title: '초등학교 정보를 입력해주세요.',
      subTitle: '초등학교',
      formData: [
        { question: '학교명', isRequired: true, value: '' },
        { question: '졸업년도', isRequired: true, value: '' },
      ],
    },
    {
      id: 2,
      title: '중학교 정보를 입력해주세요.',
      subTitle: '중학교',
      formData: [
        { question: '학교명', isRequired: true, value: '' },
        { question: '졸업년도', isRequired: true, value: '' },
      ],
    },
    {
      id: 3,
      title: '고등학교 정보를 입력해주세요.',
      subTitle: '고등학교',
      formData: [
        { question: '학교명', isRequired: true, value: '' },
        { question: '졸업년도', isRequired: true, value: '' },
      ],
    },
    {
      id: 4,
      skippable: true,
      title: 'MBTI를 적어주세요.',
      formData: [{ question: 'MBTI', isRequired: false, value: '' }],
    },
    {
      id: 5,
      title: '현재 거주중인 지역을 입력해주세요.',
      formData: [{ question: '지역', isRequired: false, value: '' }],
    },
  ]);

  function handleChange({ infoName, key, value }) {
    if (infoName === 'phoneInfo') {
      setPhoneInfo({ ...phoneInfo, [key]: value });
    }
    if (infoName === 'userInfoStep') {
      setUserInfoStep({ ...userInfoStep, [key]: value });
    }
  }

  return (
    <div className={cx('signup-container')}>
      <M.Header title={'회원가입'} />
      <div className={cx('form-container')}>
        {phoneInfo?.isValid ? (
          <div className={cx('user-info-container')}>
            {userInfoStep?.title && (
              <A.Label size={'lg'} title={userInfoStep?.title} className={cx('label-title')} />
            )}
            {userInfoStep?.subTitle && (
              <A.Label
                size={'sm'}
                title={userInfoStep?.subTitle}
                className={cx('label-title-sub')}
              />
            )}
            {userInfoStep?.formData?.map((item, index) => {
              return (
                <div className={cx('form-wrapper')} key={item?.question + userInfoStep?.id + index}>
                  <A.Label
                    size={'sm'}
                    title={item?.question}
                    required={item?.isRequired}
                    className={cx('label-title-sub')}
                  />
                  <A.Input
                    onChange={(value) => {
                      const formDataTemp = userInfoStep['formData'];
                      formDataTemp[index] = { ...item, ['value']: value };
                      handleChange({
                        infoName: 'userInfoStep',
                        key: 'formData',
                        value: formDataTemp,
                      });
                    }}
                    value={item?.value}
                  />
                </div>
              );
            })}
            <A.Button
              buttonType={'default'}
              onClick={() => {
                userInfo[userInfoStep.id - 1] = userInfoStep;
                setUserInfo(userInfo);
                if (userInfoStep.id === userInfo?.length) {
                  alert(JSON.stringify(userInfo));
                  navigate('/mypage');
                } else {
                  setUserInfoStep(userInfo?.filter((step) => step?.id === userInfoStep?.id + 1)[0]);
                }
              }}
              isFull
              disabled={
                userInfoStep?.formData?.filter((item) => item?.isRequired && item?.value === '')
                  ?.length > 0
                  ? true
                  : false
              }
            >
              {userInfoStep.id === userInfo?.length ? '완료' : '다음'}
            </A.Button>
            {userInfoStep?.skippable && <div className={cx('skip-btn')}>건너뛰기</div>}
          </div>
        ) : (
          <div className={cx('phonecheck-container')}>
            <A.Label
              size={'lg'}
              title={'휴대폰 번호를 인증해주세요'}
              className={cx('label-title')}
            />
            <A.Input
              isNumeric
              placeholder="휴대폰 번호를 입력해주세요."
              onChange={(value) => {
                handleChange({
                  infoName: 'phoneInfo',
                  key: 'number',
                  value: value.replace('-', ''),
                });
              }}
              value={numberToPhoneNumber(phoneInfo?.number)}
              className={cx('form-input')}
            />
            {phoneInfo?.getAuthNumber && (
              <div className={cx('auth-input-wrapper')}>
                <A.Input
                  isNumeric
                  placeholder="인증번호를 입력해주세요."
                  onChange={(value) => {
                    handleChange({
                      infoName: 'phoneInfo',
                      key: 'authNumber',
                      value: value,
                    });
                  }}
                  value={phoneInfo?.authNumber}
                  label={'인증시간'}
                  className={cx('form-input')}
                />
                <button>재전송</button>
              </div>
            )}
            <A.Button
              buttonType={'primary'}
              disabled={
                phoneInfo.getAuthNumber
                  ? phoneInfo?.authNumber === ''
                  : phoneInfo?.number.length < 11
              }
              onClick={() => {
                if (phoneInfo.getAuthNumber) {
                  handleChange({
                    infoName: 'phoneInfo',
                    key: 'isValid',
                    value: true,
                  });
                  setUserInfoStep(userInfo[0]);
                } else {
                  handleChange({
                    infoName: 'phoneInfo',
                    key: 'getAuthNumber',
                    value: true,
                  });
                }
              }}
              isFull
            >
              {phoneInfo.getAuthNumber ? '다음' : '인증문자 받기'}
            </A.Button>
          </div>
        )}
      </div>
    </div>
  );
}
export default Join;
export const path = '/join';
