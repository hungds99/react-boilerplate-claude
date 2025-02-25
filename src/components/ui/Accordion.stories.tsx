import { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem } from './Accordion';

const items: AccordionItem[] = [
  {
    id: 'item-1',
    title: 'What is React?',
    content: (
      <div className="space-y-2">
        <p>React is a JavaScript library for building user interfaces.</p>
        <p>It was developed by Facebook and is now maintained by Facebook and a community of individual developers and companies.</p>
      </div>
    ),
  },
  {
    id: 'item-2',
    title: 'How do I install React?',
    content: (
      <div>
        <p>The easiest way to get started with React is to use Create React App.</p>
        <pre className="bg-gray-100 dark:bg-gray-800 p-2 mt-2 rounded-sm text-sm">
          npx create-react-app my-app
        </pre>
      </div>
    ),
  },
  {
    id: 'item-3',
    title: 'What is JSX?',
    content: (
      <p>JSX is a syntax extension to JavaScript that looks similar to HTML. It's recommended to use it with React to describe what the UI should look like.</p>
    ),
  },
  {
    id: 'item-4',
    title: 'This item is disabled',
    content: (
      <p>You cannot expand this item because it is disabled.</p>
    ),
    disabled: true,
  },
];

const meta: Meta<typeof Accordion> = {
  title: 'UI/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    items,
  },
};

export const WithDefaultExpanded: Story = {
  args: {
    items,
    defaultExpandedId: 'item-1',
  },
};

export const AllowMultiple: Story = {
  args: {
    items,
    allowMultiple: true,
  },
};

export const BorderlessStyle: Story = {
  args: {
    items,
    bordered: false,
  },
};

export const LeftIconPosition: Story = {
  args: {
    items,
    iconPosition: 'left',
  },
};