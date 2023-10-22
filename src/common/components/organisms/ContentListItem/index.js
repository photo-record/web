import * as Svgs from '@assets/svgs';

import React, { useEffect, useRef, useState } from 'react';

import { Input } from '@common/components/atoms';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const ContentListItem = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div
      className={cx('content-list-container')}
      onClick={() => {
        navigate(`/detail/${data?.id}`);
      }}
    >
      <div className={cx('left-container')}>
        <div className={cx('title', 'title2MD')}>{data?.title}</div>
        <div className={cx('description', 'captionRG')}>{data?.takeDate} 촬영</div>
      </div>
      <div className={cx('right-container')}>
        <img src={data?.thumbnailSrc} alt={data?.thumbnailSrc} />
      </div>
    </div>
  );
};

export default ContentListItem;
