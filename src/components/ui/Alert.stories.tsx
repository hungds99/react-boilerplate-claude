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

export const WithIcon: Story = {
  render: () => (
    <Alert variant="info" className="flex items-start">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
      <div>
        <h4 className="font-medium">Information</h4>
        <p className="mt-1">This alert contains an icon and a title. You can use it for more complex content that requires better visual hierarchy.</p>
      </div>
    </Alert>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Alert variant="warning">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>Your trial period will expire in 3 days. Upgrade now to continue using all features.</div>
        <button className="mt-2 sm:mt-0 px-4 py-1 bg-amber-600 text-white rounded-sm hover:bg-amber-700 text-sm">
          Upgrade
        </button>
      </div>
    </Alert>
  ),
};

export const DismissibleAlert: Story = {
  render: () => (
    <Alert variant="success" className="relative">
      <button className="absolute top-3 right-3 text-green-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      <div className="pr-6">
        <h4 className="font-medium mb-1">Account created successfully!</h4>
        <p>Your account has been created and is ready to use. You can now sign in with your credentials.</p>
      </div>
    </Alert>
  ),
};