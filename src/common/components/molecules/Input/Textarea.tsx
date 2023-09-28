import * as Svgs from '@assets/svgs';

import React, { FunctionComponent, HTMLProps } from 'react';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

export interface TextAreaLayoutProps {
  title?: string;
}

const Textarea: FunctionComponent<TextareaProps> = ({ title, ...props }) => {
  return (
    <div className={cx('textarea-container')}>
      {title && <div className={cx('title-container')}>{title}</div>}
      <textarea {...props} />
    </div>
  );
};

export default Textarea;
export interface TextareaProps extends HTMLProps<HTMLTextAreaElement>, TextAreaLayoutProps {}
