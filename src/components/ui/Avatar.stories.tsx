import { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarSize, AvatarStatus } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    status: {
      control: { type: 'select' },
      options: ['online', 'offline', 'away', 'busy'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    name: 'John Doe',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/300',
    alt: 'User avatar',
  },
};

export const WithStatus: Story = {
  render: () => {
    const statuses: AvatarStatus[] = ['online', 'offline', 'away', 'busy'];
    
    return (
      <div className="flex gap-2">
        {statuses.map((status) => (
          <Avatar 
            key={status}
            src="https://i.pravatar.cc/300" 
            status={status}
            size="md"
          />
        ))}
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const sizes: AvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
    
    return (
      <div className="flex items-center gap-2">
        {sizes.map((size) => (
          <Avatar 
            key={size}
            src="https://i.pravatar.cc/300" 
            size={size}
          />
        ))}
      </div>
    );
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Avatar name="John Doe" />
        <span>Default (name initials)</span>
      </div>
      
      <div className="flex items-center gap-4">
        <Avatar src="https://i.pravatar.cc/300" />
        <span>With Image</span>
      </div>
      
      <div className="flex items-center gap-4">
        <Avatar />
        <span>Fallback (no name or image)</span>
      </div>
    </div>
  ),
};

export const Bordered: Story = {
  args: {
    src: 'https://i.pravatar.cc/300',
    bordered: true,
  },
};

export const Square: Story = {
  args: {
    src: 'https://i.pravatar.cc/300',
    square: true,
  },
};

export const Group: Story = {
  render: () => (
    <div className="flex">
      <Avatar src="https://i.pravatar.cc/300?img=1" group />
      <Avatar src="https://i.pravatar.cc/300?img=2" group />
      <Avatar src="https://i.pravatar.cc/300?img=3" group />
      <Avatar name="John Doe" group />
      <Avatar group />
    </div>
  ),
};