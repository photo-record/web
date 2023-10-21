import React from 'react';
import classNames from 'classnames/bind';
import styles from './LabelRadioButton.module.scss';

const cx = classNames.bind(styles);

function LabelRadioButton(props) {
  return (
    <div
      className={cx('radio-button')}
      onMouseOver={props?.onMouseOver}
      onMouseOut={props?.onMouseOut}
    >
      <input
        type="radio"
        id={props.value}
        name={props.name}
        value={props.value}
        defaultChecked={props.checked}
      />
      <label htmlFor={props.value} onClick={props.onChange ? props.onChange : null}>
        {props.value}
      </label>
    </div>
  );
}

export default LabelRadioButton;
