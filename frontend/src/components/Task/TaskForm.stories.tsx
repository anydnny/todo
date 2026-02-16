import type { Meta, StoryObj } from '@storybook/react-vite';

import { TaskForm } from './TaskForm';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { TaskList } from './TaskList';

const meta = {
  title: 'components/TaskForm',
  component: TaskForm,
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
          <TaskList />
        </div>
      </Provider>
    ),
  ],
} satisfies Meta<typeof TaskForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
