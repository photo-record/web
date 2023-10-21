import * as Svgs from '@assets/svgs';

import React, { useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { Input } from '@common/components/atoms';

const cx = classNames.bind(styles);

const Dropbox = ({ options, styles, title, className, onChange, value, placeholder }) => {
  const InputRef = useRef();
  const OptionsRef = useRef();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [etcValue, setEtcValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    OptionsRef && InputRef && window.addEventListener('click', handleClickOutside);

    return () => {
      OptionsRef && InputRef && window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = ({ target }) => {
    if (InputRef) {
      if (!InputRef?.current?.contains(target) && !OptionsRef?.current?.contains(target))
        setDropdownOpen(false);
    }
  };
  return (
    <div className={cx('dropbox-full-container')}>
      {title && <div className={cx('title-container')}>{title}</div>}
      <div>
        <div className={cx('dropbox-container', className)} style={styles}>
          <div
            className={cx('input-container', dropdownOpen && 'input-container-open')}
            ref={InputRef}
            isOpen={dropdownOpen}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {value?.value === 0 ? (
              '기타'
            ) : value?.label ? (
              value?.label
            ) : placeholder ? (
              <div>{placeholder}</div>
            ) : (
              ''
            )}
            {dropdownOpen ? <Svgs.ArrowTop /> : <Svgs.ArrowBottom />}
          </div>

          {dropdownOpen && (
            <div className={cx('option-container')} ref={OptionsRef}>
              {options?.map((option) => (
                <div
                  className={cx('option-item', option?.isDisable && 'option-item-disable')}
                  key={'option' + option?.value}
                  isDisable={option?.isDisable}
                  onClick={() => {
                    if (!option?.isDisable) {
                      onChange(option);
                      setDropdownOpen(false);
                      setEtcValue('');
                    }
                  }}
                >
                  {option?.label}
                </div>
              ))}
            </div>
          )}
        </div>
        {value?.value === 0 && (
          <Input
            value={etcValue}
            placeholder={'포토부스 이름을 입력해주세요.'}
            onChange={(e) => {
              setEtcValue(e);
              onChange({ value: 0, label: e });
            }}
            style={{
              padding: '8px 20px',
              backgroundColor: 'transparent',
              border: 0,
              borderBottom: '1px solid #212121',
              borderRadius: 0,
              marginTop: '12px',
              color: '#212121',
              fontSize: '14px',
              boxShadow: 'none',
              '&::placeholder': {
                color: '#ccc',
                fontSize: '12px',
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Dropbox;
