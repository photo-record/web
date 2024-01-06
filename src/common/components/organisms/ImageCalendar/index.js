import './styles.scss';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import * as Svgs from '@assets/svgs';

import React, { useEffect, useRef, useState } from 'react';

import { DayPickerSingleDateController } from 'react-dates';
import classNames from 'classnames/bind';
import moment from 'moment';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const ImageCalendar = ({ lists }) => {
  const navigate = useNavigate();
  const [value, onChange] = useState(new Date());

  return (
    <div className={cx('image-calendar-container')}>
      <DayPickerSingleDateController
        // renderNavNextButton={renderNavNextButton}
        // renderNavPrevButton={renderNavPrevButton}
        hideKeyboardShortcutsPanel={true}
        // noNavButtons={navCheckMonth()}
        monthFormat={'YYYY.MM'}
        // date={value}
        daySize={46}
        focused
        keepOpenOnDateSelect={true}
        weekDayFormat={'ddd'}
        renderDayContents={(date) => {
          const findFilter = lists.find(
            (list) => list.takeDate === moment(date).format('YYYY-MM-DD'),
          );
          return findFilter ? (
            <>
              <div
                className={cx('calendar-image')}
                onClick={() => {
                  navigate(`/detail/${findFilter?.id}`);
                }}
              >
                <div className={cx('date-label', 'overlineMD')}>{date.format('D')}</div>
                <img src={findFilter?.thumbnailSrc} alt={findFilter?.thumbnailSrc} />
              </div>
            </>
          ) : (
            <div>{date.format('D')}</div>
          );
        }}
      />
    </div>
  );
};

export default ImageCalendar;
