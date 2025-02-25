import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from './Button';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <div className="p-6">Basic Card Content</div>,
  },
};

export const WithHeaderAndFooter: Story = {
  render: () => (
    <Card>
      <Card.Header>
        <h3 className="text-lg font-medium">Card Header</h3>
      </Card.Header>
      <Card.Body>
        <p>
          This is the card body content. You can add any content here, including text, 
          images, forms, or other components.
        </p>
      </Card.Body>
      <Card.Footer>
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm">Cancel</Button>
          <Button variant="primary" size="sm">Save</Button>
        </div>
      </Card.Footer>
    </Card>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Card>
      <img 
        src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
        alt="Gradient background" 
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <Card.Body>
        <h3 className="text-xl font-bold mb-2">Card with Image</h3>
        <p className="text-gray-600 dark:text-gray-400">
          This card includes an image at the top. The image has a fixed height and covers the full width of the card.
        </p>
      </Card.Body>
      <Card.Footer>
        <Button variant="primary" fullWidth>View Details</Button>
      </Card.Footer>
    </Card>
  ),
};

export const Pricing: Story = {
  render: () => (
    <Card className="border-primary-200 dark:border-primary-800">
      <Card.Header className="bg-primary-50 dark:bg-primary-900/30 border-b border-primary-100 dark:border-primary-800">
        <h3 className="text-lg font-bold text-primary-700 dark:text-primary-300 text-center">
          Premium Plan
        </h3>
      </Card.Header>
      <Card.Body>
        <div className="text-center mb-5">
          <span className="text-3xl font-bold">$29</span>
          <span className="text-gray-600 dark:text-gray-400">/month</span>
        </div>
        <ul className="space-y-2 mb-6">
          <li className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Unlimited projects
          </li>
          <li className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Advanced analytics
          </li>
          <li className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            24/7 support
          </li>
          <li className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Custom integrations
          </li>
        </ul>
      </Card.Body>
      <Card.Footer>
        <Button variant="primary" fullWidth>
          Get Started
        </Button>
      </Card.Footer>
    </Card>
  ),
};