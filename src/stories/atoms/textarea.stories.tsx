import { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import Textarea, { TextareaProps } from '@components/atoms/Textarea/index';

export default {
  title: 'components/Atoms/Textarea',
  component: Textarea,
} as Meta;

const Template: Story<TextareaProps> = (args) => {
  const [value, setValue] = useState<string>('');
  const textareaHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value);
  };
  return <Textarea {...args} value={value} onChange={textareaHandler} />;
};

export const Default = Template.bind({});
Default.args = {
  placeholder: '빈칸을 채우시오',
  error: 'error',
  minLen: 0,
  maxLen: 100,
};
