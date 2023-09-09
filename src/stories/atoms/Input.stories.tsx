import Input, { InputProps } from '@components/atoms/Input/index';
import React, { useState } from 'react';

import { Story } from '@storybook/react';

export default {
  title: 'components/Atoms/Input',
  component: Input,
};
// const Template: Story<InputProps> = (args) => <Input {...args} />;

const Template: Story<InputProps> = (args) => {
  const [value, setValue] = useState<string>('');
  const inputHandler = (value) => {
    setValue(value);
  };
  return <Input {...args} value={value} onChange={inputHandler} />;
};
export const TextType = Template.bind({});
TextType.args = {
  type: 'text',
  placeholder: '빈칸을 채우시오',
  error: 'error',
  isNumeric: false,
  minLen: 0,
  maxLen: 100,
};
export const NumberType = Template.bind({});
NumberType.args = {
  type: 'number',
  placeholder: '빈칸을 채우시오',
  error: 'error',
  isNumeric: false,
  minLen: 0,
  maxLen: 100,
};

export const DateType = Template.bind({});
DateType.args = {
  type: 'date',
  placeholder: '빈칸을 채우시오',
  error: 'error',
  isNumeric: false,
  minLen: 0,
  maxLen: 100,
};

export const EmailType = Template.bind({});
EmailType.args = {
  type: 'email',
  placeholder: '빈칸을 채우시오',
  error: 'error',
  isNumeric: false,
  minLen: 0,
  maxLen: 100,
};

export const PasswordType = Template.bind({});
PasswordType.args = {
  type: 'password',
  placeholder: '빈칸을 채우시오',
  error: 'error',
  isNumeric: false,
  minLen: 0,
  maxLen: 100,
};
