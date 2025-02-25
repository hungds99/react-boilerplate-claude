import { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'UI/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    onChange: { action: 'toggled' },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    label: 'Toggle me',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <Toggle label="Small toggle" size="sm" />
      <Toggle label="Medium toggle" size="md" />
      <Toggle label="Large toggle" size="lg" />
    </div>
  ),
};

export const WithLabel: Story = {
  args: {
    label: 'Enable notifications',
  },
};

export const DefaultOn: Story = {
  args: {
    label: 'Active by default',
    toggled: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled toggle',
    disabled: true,
  },
};

export const DisabledOn: Story = {
  args: {
    label: 'Disabled toggle (on)',
    disabled: true,
    toggled: true,
  },
};