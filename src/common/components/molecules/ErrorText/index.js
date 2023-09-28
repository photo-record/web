import React, { PureComponent } from 'react';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { IcError } from '@assets/svgs';

const cx = classNames.bind(styles);
class ErrorText extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <p className={cx('ErrorText')} {...this.props}>
        <IcError />
        {children}
      </p>
    );
  }
}

export default ErrorText;
