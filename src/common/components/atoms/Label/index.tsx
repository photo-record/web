import React, { FunctionComponent } from 'react';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

export interface InputLayoutProps {
  className?: string;
  required?: boolean;
  title?: string;
  size?: string;
}

const Label: FunctionComponent<LabelProps> = ({ size, required, className, title }) => {
  return (
    <div className={cx('label', `label-${size ?? 'sm'}`, className)}>
      {title}
      {required && <span className={cx('required')}>*</span>}
    </div>
  );
};

export default Label;
export type LabelProps = InputLayoutProps;
