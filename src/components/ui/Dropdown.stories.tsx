import { Meta, StoryObj } from '@storybook/react';
import { Dropdown, DropdownOption } from './Dropdown';

const options: DropdownOption[] = [
  { id: '1', label: 'Option 1', value: 'option1' },
  { id: '2', label: 'Option 2', value: 'option2' },
  { id: '3', label: 'Option 3', value: 'option3' },
  { id: '4', label: 'Option 4 (Disabled)', value: 'option4', disabled: true },
  { id: '5', label: 'Option 5', value: 'option5' },
];

const meta: Meta<typeof Dropdown> = {
  title: 'UI/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    options,
    placeholder: 'Select an option',
  },
};

export const WithLabel: Story = {
  args: {
    options,
    label: 'Favorite option',
    placeholder: 'Please select...',
  },
};

export const Preselected: Story = {
  args: {
    options,
    value: 'option2',
    label: 'Preselected option',
  },
};

export const FullWidth: Story = {
  args: {
    options,
    fullWidth: true,
    label: 'Full width dropdown',
  },
  parameters: {
    layout: 'padded',
  },
};

export const WithError: Story = {
  args: {
    options,
    error: 'Please select a valid option',
    label: 'With error message',
  },
};

export const Disabled: Story = {
  args: {
    options,
    disabled: true,
    label: 'Disabled dropdown',
    placeholder: 'Cannot select',
  },
};