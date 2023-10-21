import * as Svgs from '@assets/svgs';

import React, { useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { Input } from '@common/components/atoms';

const cx = classNames.bind(styles);

const ContentListItem = ({ data }) => {
  return (
    <div className={cx('content-list-container')}>
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
