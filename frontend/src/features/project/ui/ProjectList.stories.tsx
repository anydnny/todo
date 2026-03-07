import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProjectList } from './ProjectList';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';

const meta = {
  title: 'features/project/ProjectList',
  component: ProjectList,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
  decorators: [
    Story => (
      <Provider store={store}>
        <div style={{ width: '60%' }}>
          <Story />
        </div>
      </Provider>
    ),
  ],
} satisfies Meta<typeof ProjectList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'projects',
  },
};
