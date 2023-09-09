import * as Svgs from '@assets/svgs';

import React, { FunctionComponent, HTMLProps } from 'react';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

export interface HeaderLayoutProps {
  title?: string;
  leftButtonRender?: () => JSX.Element;
  rightButtonRender?: () => JSX.Element;
  noBorder?: boolean;
}

const Header: FunctionComponent<HeaderProps> = ({
  title,
  leftButtonRender,
  rightButtonRender,
  noBorder,
}) => {
  const navigate = useNavigate();
  return (
    <div className={cx('header-container')}>
      <div className={cx('header-container-fix', noBorder && 'header-container-fix-no-border')}>
        <div className={cx('button-wrapper', 'button-wrapper-left')}>
          {leftButtonRender ? (
            leftButtonRender()
          ) : (
            <button onClick={() => navigate(-1)}>
              <Svgs.ArrowLeft />
            </button>
          )}
        </div>
        <div className={cx('title-wrapper')}>{title}</div>
        <div className={cx('button-wrapper', 'button-wrapper-right')}>
          {
            rightButtonRender && rightButtonRender()
            //   : (
            //     <button>
            //       <Svgs.ArrowLeft />
            //     </button>
            //   )
          }
        </div>
      </div>
    </div>
  );
};

export default Header;
export interface HeaderProps extends HTMLProps<HTMLDivElement>, HeaderLayoutProps {}
