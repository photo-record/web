import React, { Children, useEffect, useRef, useState } from 'react';

import { Button } from '@common/components/atoms';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const DefaultPopup = ({ title, description, isOpen, onClose, children }) => {
  const navigate = useNavigate();

  return isOpen ? (
    <>
      <div className={cx('background')} onClick={onClose}></div>
      <div className={cx('popup-container')}>
        {title && <div className={cx('title', 'title1BD')}>{title}</div>}
        {description && <div className={cx('description', 'bodyMD')}>{description}</div>}
        {children}
        <div className={cx('button-container')}>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            isFull
            buttonType="primary"
          >
            확인
          </Button>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};

export default DefaultPopup;
