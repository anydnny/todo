import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProjectsDropdown } from './ProjectsDropdown';

const meta = {
  title: 'features/project/ProjectsDropdown',
  component: ProjectsDropdown,
} satisfies Meta<typeof ProjectsDropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
