import type { Meta, StoryObj } from '@storybook/react-vite';

import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { TaskItem } from './TaskItem';
import { TASK_STATUS } from '../../utils/taskTypes';
const testTask = {
  id: '1',
  title: 'Test task',
  status: TASK_STATUS.NEW,
  createdAt: '2024-06-01',
  projectId: 'Inbox',
  isTaskEdit: false,
};

const meta = {
  title: 'components/TaskItem',
  component: TaskItem,
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
} satisfies Meta<typeof TaskItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    taskInfo: testTask,
  },
};
