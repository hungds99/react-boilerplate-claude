import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta = {
  title: 'UI/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { 
      control: 'select', 
      options: ['info', 'success', 'warning', 'danger'],
      description: 'The visual style of the alert'
    },
    className: { 
      control: 'text',
      description: 'Additional CSS classes to apply to the alert'
    },
    children: { 
      control: 'text',
      description: 'The content of the alert'
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '450px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'This is an informational alert. It provides helpful information to the user.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success! Your changes have been saved successfully.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning! This action cannot be undone once submitted.',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Error! There was a problem processing your request. Please try again.',
  },
};
