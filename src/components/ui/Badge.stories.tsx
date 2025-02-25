import { Meta, StoryObj } from '@storybook/react';
import { Badge, BadgeVariant } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Variants: Story = {
  render: () => {
    const variants: BadgeVariant[] = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];
    
    return (
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => (
          <Badge key={variant} variant={variant}>
            {variant}
          </Badge>
        ))}
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

export const Rounded: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Badge rounded={false}>Square</Badge>
      <Badge rounded={true}>Rounded</Badge>
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <Badge variant="primary" withDot>Primary</Badge>
        <Badge variant="success" withDot>Success</Badge>
        <Badge variant="danger" withDot>Danger</Badge>
        <Badge variant="warning" withDot>Warning</Badge>
      </div>
      <div>
        <Badge variant="primary" withDot rounded>Notifications</Badge>
      </div>
    </div>
  ),
};