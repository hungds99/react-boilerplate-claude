import { Meta, StoryObj } from '@storybook/react';
import { Tabs, Tab } from './Tabs';

const tabs: Tab[] = [
  {
    id: 'tab1',
    label: 'Profile',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-medium mb-2">Profile Content</h3>
        <p>This is the profile tab content.</p>
      </div>
    ),
  },
  {
    id: 'tab2',
    label: 'Settings',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-medium mb-2">Settings Content</h3>
        <p>Configure your application settings here.</p>
      </div>
    ),
  },
  {
    id: 'tab3',
    label: 'Notifications',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-medium mb-2">Notifications</h3>
        <p>Manage your notification preferences.</p>
      </div>
    ),
  },
  {
    id: 'tab4',
    label: 'Disabled',
    content: <div>This content is not accessible</div>,
    disabled: true,
  },
];

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    onChange: { action: 'tab changed' },
    variant: {
      control: { type: 'select' },
      options: ['default', 'bordered', 'pills'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    tabs,
    defaultTabId: 'tab1',
  },
};

export const VariantBordered: Story = {
  args: {
    tabs,
    variant: 'bordered',
    defaultTabId: 'tab1',
  },
};

export const VariantPills: Story = {
  args: {
    tabs,
    variant: 'pills',
    defaultTabId: 'tab1',
  },
};

export const StartWithSecondTab: Story = {
  args: {
    tabs,
    defaultTabId: 'tab2',
    variant: 'default',
  },
};