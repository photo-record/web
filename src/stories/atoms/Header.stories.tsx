import Header, { HeaderProps } from '@components/molecules/Header';
import { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { Route, Router } from 'react-router';

import { withRouter } from 'storybook-addon-react-router-v6';

export default {
  title: 'components/Molecules/Header',
  component: Header,
  decorators: [withRouter],
} as Meta;

const Template: Story<HeaderProps> = (args) => {
  return <Header {...args} title={'회원가입'} />;
};

export const Default = Template.bind({});

export const CustomLeftButton = Template.bind({});
CustomLeftButton.args = {
  leftButtonRender: () => {
    return <div onClick={() => window.alert('버튼 눌림')}>왼쪽</div>;
  },
  noBorder: false,
};
export const CustomRightButton = Template.bind({});
CustomRightButton.args = {
  rightButtonRender: () => {
    return <div onClick={() => window.alert('버튼 눌림')}>오른쪽</div>;
  },
  noBorder: false,
};
