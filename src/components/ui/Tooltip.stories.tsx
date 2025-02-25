import { Meta, StoryObj } from '@storybook/react';
import { Tooltip, TooltipPlacement } from './Tooltip';
import { Button } from './Button';

const meta: Meta<typeof Tooltip> = {
  title: 'UI/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left'],
    },
    delay: {
      control: { type: 'number' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: <Button>Hover me</Button>,
  },
};

export const Placements: Story = {
  render: () => {
    const placements: TooltipPlacement[] = ['top', 'right', 'bottom', 'left'];
    
    return (
      <div className="grid grid-cols-2 gap-8">
        {placements.map((placement) => (
          <Tooltip 
            key={placement}
            content={`Tooltip on ${placement}`}
            placement={placement}
          >
            <Button variant="outline">{placement}</Button>
          </Tooltip>
        ))}
      </div>
    );
  },
};

export const WithLongContent: Story = {
  args: {
    content: 'This is a tooltip with a longer content that will wrap to multiple lines to demonstrate how the tooltip handles longer text content.',
    children: <Button>Hover for long tooltip</Button>,
  },
};

export const WithCustomDelay: Story = {
  args: {
    content: 'This tooltip appears after 1 second',
    delay: 1000,
    children: <Button>Slow tooltip</Button>,
  },
};

export const Disabled: Story = {
  args: {
    content: 'This tooltip is disabled',
    disabled: true,
    children: <Button>No tooltip</Button>,
  },
};