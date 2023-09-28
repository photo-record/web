import * as A from '@components/atoms';
import * as Svgs from '@assets/svgs';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import Input from '@common/components/molecules/Input/Input';
import { ImageUploadButton, VideoUploadButton } from '@common/components/molecules';
import Textarea from '@common/components/molecules/Input/Textarea';
import Dropbox from '@common/components/molecules/Dropbox';
import ErrorText from '@common/components/molecules/ErrorText';

const cx = classNames.bind(styles);
function Create() {
  const [error, setError] = useState('');
  const [values, setValues] = useState({
    title: '',
    contents: [
      {
        imageSrc: '',
        videoSrc: '',
        description: '',
        photoBoothName: '',
        isThumbnail: true,
      },
    ],
    takeDate: '',
    with: '',
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
  ];

  function handleChange(key, value) {
    setValues({ ...values, [key]: value });
  }
  return (
    <div className={cx('create-container')}>
      <div className={cx('title-container')}>
        <Input
          placeholder={'이름을 지어주세요.'}
          value={values?.title}
          onChange={(e) => handleChange('title', e?.target?.value)}
        />
      </div>
      <hr className={cx('main-hr')} style={{ marginBottom: 0 }} />
      <div className={cx('contents-container')}>
        {values?.contents?.map((content, index) => (
          <div className={cx('content-container')} key={'content-index' + index}>
            <div className={cx('assets-container')}>
              {content?.imageSrc !== '' ? (
                <div className={cx('apply-container', 'apply-container-after-image')}>
                  <img src={content?.imageSrc} />
                </div>
              ) : (
                <ImageUploadButton
                  onUploaded={(url) => {
                    let tempArray = values?.contents;
                    tempArray[index].imageSrc = url;
                    handleChange('contents', tempArray);
                  }}
                  className={cx('apply-container', 'apply-container-image')}
                  renderButton={() => (
                    <>
                      <img src={require('@assets/framesChange.png')} />
                      <div>이미지 등록하기</div>
                    </>
                  )}
                />
              )}
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
                  className={cx('apply-container', 'apply-container-video')}
                  renderButton={() => (
                    <>
                      <img src={require('@assets/video.png')} />
                      <div>영상 등록하기</div>
                    </>
                  )}
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
                  options={photoBoothList.sort((a, b) =>
                    b.value === 0 ? -1 : a.label > b.label ? 1 : -1,
                  )}
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
              isThumbnail: true,
            });
            handleChange('contents', tempArray);
          }}
        >
          포토 추가하기
        </button>
      </div>
      <hr className={cx('main-hr')} />
      <div className={cx('button-wrapper')}>
        <buttom className={cx('submit-btn', 'submit-btn-disable')}>등록하기</buttom>
      </div>
    </div>
  );
}
export default Create;
export const path = '/create';
