import * as A from '@components/atoms';
import * as Svgs from '@assets/svgs';

import { Checkbox, ImageUploadButton, VideoUploadButton } from '@common/components/molecules';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CalendarInput from '@common/components/molecules/Input/CalendarInput';
import Dropbox from '@common/components/molecules/Dropbox';
import ErrorText from '@common/components/molecules/ErrorText';
import Input from '@common/components/molecules/Input/Input';
import SelectInput from '@common/components/molecules/Input/Select';
import Textarea from '@common/components/molecules/Input/Textarea';
import classNames from 'classnames/bind';
import { getContentsDetail } from '@modules/get';
import { isLoading } from '@modules/atoms';
import { postContent } from '@modules/post';
import styles from './styles.module.scss';
import { useRecoilState } from 'recoil';

const cx = classNames.bind(styles);
function Detail({ match }) {
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useRecoilState(isLoading);
  const [data, setData] = useState(undefined);

  useEffect(() => {
    setLoading(true);

    async function fetchData() {
      const result = await getContentsDetail(params?.contentId);
      setData(result);
      setLoading(false);
    }

    parseInt(params?.contentId) > 0 && fetchData();
  }, []);

  return (
    <div className={cx('detail-container')}>
      <div className={cx('title', 'headline3BD')}>{data?.title}</div>
      <div className={cx('description', 'bodyRG')}>{data?.description}</div>
      <div className={cx('friends', 'bodyRG')}>
        {JSON.parse(data?.friends ?? '[]')?.map((friend) => (
          <div>{friend?.label}</div>
        ))}
      </div>
      <div className={cx('takedate', 'bodyRG')}>{data?.takeDate}</div>
      <div className={cx('assets-container', 'bodyRG')}>
        {data?.assets?.map((asset) => (
          <div className={cx('asset-wrapper', 'bodyRG')}>
            <div className={cx('asset-image', 'bodyRG')}>
              <img src={asset?.imageSrc} />
            </div>

            <div className={cx('asset-description', 'bodyRG')}>{asset?.description}</div>
            <div className={cx('asset-photobooth', 'bodyRG')}>
              {JSON.parse(asset?.photoboothName)?.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Detail;
export const loginRequire = false;
export const path = '/detail/:contentId';
