import Label, { LabelProps } from '@components/atoms/Label/index';

import React from 'react';
import { Story } from '@storybook/react';

export default {
  title: 'components/Atoms/Label',
  component: Label,
};

const Template: Story<LabelProps> = (args) => <Label title="라벨" required={true} {...args} />;

export const Default = Template.bind({});

export const SMSize = Template.bind({});

Default.args = { size: 'sm' };

export const LGSize = Template.bind({});

Default.args = { size: 'lg' };
