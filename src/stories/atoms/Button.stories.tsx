import Button, { ButtonProps } from '@components/atoms/Button/index';

import React from 'react';
import { Story } from '@storybook/react';

export default {
  title: 'components/Atoms/Button',
  component: Button,
};

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});

Default.args = {
  buttonType: 'default',
  isFull: false,
  disabled: false,
  children: '버튼text',
  buttonSize: 'MD',
};

export const Primary = Template.bind({});

Primary.args = {
  buttonType: 'primary',
  isFull: false,
  disabled: false,
  children: '버튼text',
  buttonSize: 'MD',
};
