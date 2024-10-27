import './styles.scss';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import * as Svgs from '@assets/svgs';

import React, { useEffect, useRef, useState } from 'react';

import ContentListItem from '../ContentListItem';
import { DayPickerSingleDateController } from 'react-dates';
import DefaultPopup from '../DefaultPopup';
import classNames from 'classnames/bind';
import moment from 'moment';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const ImageCalendar = ({ lists }) => {
  const navigate = useNavigate();
  const [value, onChange] = useState(new Date());
  const [popupData, setPopupData] = useState({});

  return (
    <div className={cx('image-calendar-container')}>
      <DayPickerSingleDateController
        hideKeyboardShortcutsPanel={true}
        monthFormat={'YYYY.MM'}
        daySize={46}
        focused
        keepOpenOnDateSelect={true}
        weekDayFormat={'ddd'}
        renderDayContents={(date) => {
          const findFilter = lists.filter(
            (list) => list.takeDate === moment(date).format('YYYY-MM-DD'),
          );
          return findFilter?.length > 0 ? (
            <>
              <div
                className={cx('calendar-image')}
                onClick={() => {
                  if (findFilter?.length === 1) {
                    navigate(`/detail/${findFilter[0]?.id}`);
                  } else {
                    setPopupData({ isOpen: true, data: findFilter });
                  }
                }}
              >
                <div className={cx('date-label', 'overlineMD')}>{date.format('D')}</div>
                <img src={findFilter[0]?.thumbnailSrc} alt={findFilter[0]?.thumbnailSrc} />
                {findFilter?.length > 1 && (
                  <div className={cx('date-more', 'overlineBD')}>외 {findFilter?.length - 1}개</div>
                )}
              </div>
            </>
          ) : (
            <div>{date.format('D')}</div>
          );
        }}
      />
      <DefaultPopup
        title={`총 ${popupData?.data?.length}건이 있어요.`}
        onClose={() => {
          setPopupData({});
        }}
        {...popupData}
      >
        {popupData?.data?.length > 0 &&
          popupData?.data?.map((list) => <ContentListItem data={list} />)}
      </DefaultPopup>
    </div>
  );
};

export default ImageCalendar;
