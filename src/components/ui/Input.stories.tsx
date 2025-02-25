import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { 
      control: 'text',
      description: 'The label for the input field'
    },
    type: { 
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'date', 'tel', 'url', 'search'],
      description: 'The type of the input field'
    },
    placeholder: { 
      control: 'text',
      description: 'Placeholder text for the input field'
    },
    value: { 
      control: 'text', 
      description: 'The value of the input field'
    },
    disabled: { 
      control: 'boolean',
      description: 'Whether the input field is disabled'
    },
    required: { 
      control: 'boolean',
      description: 'Whether the input field is required'
    },
    error: { 
      control: 'text',
      description: 'Error message to display below the input field'
    },
    helperText: { 
      control: 'text',
      description: 'Helper text to display below the input field'
    },
    fullWidth: { 
      control: 'boolean',
      description: 'Whether the input field should take the full width of its container'
    },
    autoComplete: { 
      control: 'text',
      description: 'The autocomplete attribute for the input field'
    },
    onChange: { action: 'changed' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Username',
    type: 'text',
    name: 'username',
    id: 'username',
    placeholder: 'Enter your username',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Email',
    type: 'email',
    name: 'email',
    id: 'email',
    placeholder: 'Enter your email',
    value: 'user@example.com',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    name: 'password',
    id: 'password',
    placeholder: 'Enter your password',
    helperText: 'Password must be at least 8 characters long',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    type: 'email',
    name: 'email',
    id: 'email',
    placeholder: 'Enter your email',
    value: 'invalid-email',
    error: 'Please enter a valid email address',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Username',
    type: 'text',
    name: 'username',
    id: 'username',
    placeholder: 'Enter your username',
    disabled: true,
    value: 'disabled_user',
  },
};

export const Required: Story = {
  args: {
    label: 'Username',
    type: 'text',
    name: 'username',
    id: 'username',
    placeholder: 'Enter your username',
    required: true,
  },
};

export const Number: Story = {
  args: {
    label: 'Age',
    type: 'number',
    name: 'age',
    id: 'age',
    placeholder: 'Enter your age',
    min: 0,
    max: 120,
  },
};

export const Date: Story = {
  args: {
    label: 'Birth Date',
    type: 'date',
    name: 'birthdate',
    id: 'birthdate',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Name',
    type: 'text',
    name: 'fullname',
    id: 'fullname',
    placeholder: 'Enter your full name',
    fullWidth: true,
  },
};