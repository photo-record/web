import * as Svgs from '@assets/svgs';

import React, { useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

const Checkbox = ({ text, onClick, value }) => {
  return (
    <div onClick={(e) => onClick(e)} className={cx('checkbox-container')}>
      {value ? <Svgs.IcCheckboxFilled /> : <Svgs.IcCheckbox />}
      {text ?? ''}
    </div>
  );
};

export default Checkbox;
