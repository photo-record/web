import * as Svgs from '@assets/svgs';

import React, { FunctionComponent, HTMLProps } from 'react';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import Select from '@common/components/atoms/Select';

const cx = classNames.bind(styles);

export interface InputLayoutProps {
  title?: string;
  selectValue?: string[];
}

const SelectInput: FunctionComponent<InputProps> = ({ title, selectValue, ...props }) => {
  const navigate = useNavigate();

  return (
    <div className={cx('input-container', 'select-container')}>
      {title && <div className={cx('title-container')}>{title}</div>}
      <Select onChange={props?.onChange} selectValue={selectValue} />
    </div>
  );
};

export default SelectInput;
export interface InputProps extends HTMLProps<HTMLInputElement>, InputLayoutProps {}
