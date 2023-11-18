import 'swiper/scss';
import 'swiper/scss/navigation';
import './style.scss';

import * as A from '@components/atoms';
import * as Svgs from '@assets/svgs';

import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Checkbox, ImageUploadButton, VideoUploadButton } from '@common/components/molecules';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate, useParams } from 'react-router-dom';

import classNames from 'classnames/bind';
import { getContentsDetail } from '@modules/get';
import { isLoading } from '@modules/atoms';
import { postContent } from '@modules/post';
import styles from './styles.module.scss';
import { useRecoilState } from 'recoil';

const cx = classNames.bind(styles);
function Detail({ match }) {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
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
      <div className={cx('title', 'headline1BD')}>{data?.title}</div>
      <div className={cx('description', 'title1MD')}>{data?.description}</div>
      <div className={cx('friends')}>
        <div className={cx('label', 'title2BD')}>함께한 사람</div>
        <div className={cx('friend-container')}>
          {JSON.parse(data?.friends ?? '[]')?.map((friend) => (
            <div className={cx('friend', 'bodyMD')}>{friend?.label}</div>
          ))}
        </div>
      </div>
      <div className={cx('takedate', 'bodyMD')}>
        <div className={cx('label', 'title2BD')}>촬영한 날</div>
        {data?.takeDate}
      </div>
      <div className={cx('assets-container', 'bodyRG')}>
        {data?.assets?.map((asset, idx) => (
          <>
            {idx !== 0 && <div className={cx('gray-line')} />}
            <div className={cx('asset-wrapper', 'bodyRG')} key={'assets' + idx}>
              <Swiper
                modules={[Navigation]}
                slidesPerView={1}
                onSwiper={(swiper) => console.log(swiper)}
                className={cx('swiper-container')}
                allowTouchMove={true}
                navigation={true}
              >
                <SwiperSlide>
                  <div className={cx('asset-image')}>
                    <img src={asset?.imageSrc} />
                  </div>
                </SwiperSlide>
                {asset?.videoSrc && (
                  <SwiperSlide>
                    <div className={cx('asset-video')}>
                      <video controls>
                        <source src={asset?.videoSrc} />
                      </video>
                    </div>
                  </SwiperSlide>
                )}
              </Swiper>
              <div className={cx('asset-description', 'bodyMD')}>{asset?.description}</div>
              <div className={cx('asset-photobooth', 'captionMD')}>
                {JSON.parse(asset?.photoboothName)?.label}
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
export default Detail;
export const loginRequire = false;
export const path = '/detail/:contentId';
