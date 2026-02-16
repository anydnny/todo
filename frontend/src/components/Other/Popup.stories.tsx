import type { Meta, StoryObj } from '@storybook/react-vite';

import { Dropdown } from './Popup';

const meta = {
  component: Dropdown,
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
