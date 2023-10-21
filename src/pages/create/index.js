import * as A from '@components/atoms';
import * as Svgs from '@assets/svgs';

import { Checkbox, ImageUploadButton, VideoUploadButton } from '@common/components/molecules';
import React, { useEffect, useState } from 'react';

import CalendarInput from '@common/components/molecules/Input/CalendarInput';
import Dropbox from '@common/components/molecules/Dropbox';
import ErrorText from '@common/components/molecules/ErrorText';
import Input from '@common/components/molecules/Input/Input';
import SelectInput from '@common/components/molecules/Input/Select';
import Textarea from '@common/components/molecules/Input/Textarea';
import classNames from 'classnames/bind';
import { postContent } from '@modules/post';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
function Create() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [values, setValues] = useState({
    title: '',
    description: '',
    contents: [
      {
        imageSrc: '',
        videoSrc: '',
        description: '',
        photoBoothName: '',
      },
    ],
    thumbnailSrc: '',
    takeDate: undefined,
    friends: [],
  });

  let photoBoothList = [
    { value: 0, label: '기타' },
    { value: 1, label: '인생네컷' },
    { value: 2, label: '포토그레이' },
    { value: 3, label: '포토시그니처' },
    { value: 4, label: '모노맨션' },
    { value: 5, label: '포토이즘' },
    { value: 6, label: '비룸스튜디오' },
    { value: 7, label: '하루필름' },
    { value: 8, label: '포토매틱' },
    { value: 9, label: '셀픽스' },
    { value: 10, label: '포토아이브' },
    { value: 11, label: '포토드링크' },
  ].sort((a, b) => (b.value === 0 ? -1 : a.label > b.label ? 1 : -1));

  function handleChange(key, value) {
    if (
      (key === 'contents', value?.length === 1 && value[0]?.imageSrc && values?.thumbnailSrc === '')
    )
      setValues({ ...values, thumbnailSrc: value[0]?.imageSrc, [key]: value });
    else setValues({ ...values, [key]: value });
  }
  async function handleSubmit() {
    let tempValues = { ...values };
    await postContent(tempValues);
    window.alert('등록이 되었습니다.');
    navigate('/');
  }
  useEffect(() => {
    if (values.title === '') {
      setIsValid(false);
    } else if (values?.takeDate === undefined) {
      setIsValid(false);
    } else if (
      values.contents.filter((content) => {
        return content?.imageSrc === '' || !content?.photoBoothName?.label;
      })?.length > 0
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [values]);
  return (
    <div className={cx('create-container')}>
      <div className={cx('input-container', 'title-container')}>
        <Input
          placeholder={'제목을 작성해주세요'}
          value={values?.title}
          onChange={(e) => handleChange('title', e?.target?.value)}
        />
      </div>
      <div className={cx('input-container', 'description-container')}>
        <Textarea
          value={values?.description}
          placeholder={'무슨 일이 있었는지 자유롭게 적어주세요'}
          onChange={(e) => handleChange('description', e?.target?.value)}
          maxLength={1000}
        />
      </div>
      <hr className={cx('main-hr')} style={{ marginBottom: 0 }} />
      <div className={cx('contents-container')}>
        {values?.contents?.map((content, index) => (
          <div className={cx('content-container')} key={'content-index' + index}>
            <div className={cx('assets-container')}>
              <ImageUploadButton
                className={cx(
                  'apply-container',
                  content?.imageSrc !== ''
                    ? 'apply-container-after-image'
                    : 'apply-container-image',
                )}
                onUploaded={(url) => {
                  let tempArray = values?.contents;
                  tempArray[index].imageSrc = url;
                  handleChange('contents', tempArray);
                }}
                renderButton={() =>
                  content?.imageSrc !== '' ? (
                    <>
                      <img src={content?.imageSrc} />
                      <Checkbox
                        text={'메인'}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleChange('thumbnailSrc', content?.imageSrc);
                        }}
                        value={content?.imageSrc === values?.thumbnailSrc}
                      />
                    </>
                  ) : (
                    <>
                      <img src={require('@assets/framesChange.png')} />
                      <div>이미지 등록하기</div>
                    </>
                  )
                }
              />

              {content?.videoSrc !== '' ? (
                <div className={cx('apply-container', 'apply-container-after-video')}>
                  <video controls>
                    <source src={content?.videoSrc} />
                  </video>
                </div>
              ) : (
                <VideoUploadButton
                  onUploaded={(url) => {
                    let tempArray = values?.contents;
                    tempArray[index].videoSrc = url;
                    handleChange('contents', tempArray);
                  }}
                  className={cx(
                    'apply-container',
                    content?.videoSrc !== ''
                      ? 'apply-container-after-video'
                      : 'apply-container-video',
                  )}
                  renderButton={() =>
                    content?.videoSrc !== '' ? (
                      <video controls>
                        <source src={content?.videoSrc} />
                      </video>
                    ) : (
                      <>
                        <img src={require('@assets/video.png')} />
                        <div>영상 등록하기</div>
                      </>
                    )
                  }
                />
              )}
            </div>
            <div className={cx('extra-info-container')}>
              <div className={cx('description-container')}>
                <Textarea
                  value={content?.description}
                  placeholder={'컨셉, 분위기, 기분 등 자유롭게 적어주세요'}
                  onChange={(e) => {
                    if (e.target.value.length >= 1000) {
                      setError('1,000자 이내로 작성해 주세요.');
                    } else {
                      setError('');
                    }

                    let tempArray = values?.contents;
                    tempArray[index].description = e.target.value.slice(0, 1000);
                    handleChange('contents', tempArray);
                  }}
                  maxLength={1000}
                />
                <div className={cx('error-text')}>{error && <ErrorText>{error}</ErrorText>}</div>
              </div>
              <div className={cx('photobooth-container')}>
                <Dropbox
                  title={'포토부스 이름'}
                  options={photoBoothList}
                  placeholder={'선택하기'}
                  onChange={(e) => {
                    let tempArray = values?.contents;
                    tempArray[index].photoBoothName = e;
                    handleChange('contents', tempArray);
                  }}
                  value={content?.photoBoothName}
                />
              </div>
            </div>
          </div>
        ))}
        <button
          className={cx('add-photo-btn')}
          onClick={() => {
            let tempArray = [...values?.contents];
            tempArray.push({
              imageSrc: '',
              videoSrc: '',
              description: '',
              photoBoothName: '',
            });
            handleChange('contents', tempArray);
          }}
        >
          포토 추가하기
        </button>
      </div>
      <hr className={cx('main-hr')} />
      <div className={cx('input-container', 'date-container')}>
        <CalendarInput
          title={'언제 촬영했나요?'}
          value={values?.takeDate}
          onChange={(e) => {
            handleChange('takeDate', e?.target?.value);
          }}
          type={'date'}
        />
      </div>
      <div className={cx('input-container', 'friends-container')}>
        <SelectInput
          title={'누구와 함께 다녀오셨나요?'}
          selectValue={values?.friends}
          onChange={(e) => {
            handleChange('friends', e);
          }}
          type={'date'}
        />
      </div>
      <div className={cx('button-wrapper')}>
        <button
          className={cx('submit-btn', !isValid && 'submit-btn-disable')}
          onClick={
            isValid
              ? () => {
                  //   console.log(values);
                  handleSubmit();
                }
              : () => {
                  console.log(values);
                }
          }
        >
          등록하기
        </button>
      </div>
    </div>
  );
}
export default Create;
export const loginRequire = true;
export const path = '/create';
