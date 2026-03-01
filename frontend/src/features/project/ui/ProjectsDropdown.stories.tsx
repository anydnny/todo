import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProjectsDropdown } from './ProjectsDropdown';
import { PROJECT_TYPE } from '../types/projectTypes';

const meta = {
  title: 'features/project/ProjectsDropdown',
  component: ProjectsDropdown,
} satisfies Meta<typeof ProjectsDropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    projectsList: [
      {
        id: 'project-1',
        name: 'Inbox',
        createdAt: '2026-03-01T00:00:00.000Z',
        projectListType: PROJECT_TYPE.SYSTEM,
      },
      {
        id: 'project-2',
        name: 'Work',
        createdAt: '2026-03-01T00:00:00.000Z',
        projectListType: PROJECT_TYPE.CUSTOM,
      },
    ],
    currentProjectId: 'project-1',
    onSelect: () => {},
  },
};
