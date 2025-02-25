import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'UI/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    onPageChange: { action: 'page changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

const PaginationWithControls = ({ totalPages, ...props }) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  return (
    <Pagination 
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      {...props}
    />
  );
};

export const Default: Story = {
  render: () => <PaginationWithControls totalPages={10} />,
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <span className="text-sm mr-2">Small:</span>
        <PaginationWithControls totalPages={5} size="sm" />
      </div>
      <div>
        <span className="text-sm mr-2">Medium:</span>
        <PaginationWithControls totalPages={5} size="md" />
      </div>
      <div>
        <span className="text-sm mr-2">Large:</span>
        <PaginationWithControls totalPages={5} size="lg" />
      </div>
    </div>
  ),
};

export const WithFirstLastButtons: Story = {
  render: () => <PaginationWithControls totalPages={10} showFirstLast />,
};

export const LargeNumberOfPages: Story = {
  render: () => <PaginationWithControls totalPages={100} />,
};

export const CustomLabels: Story = {
  render: () => (
    <PaginationWithControls 
      totalPages={10}
      prevLabel="Previous"
      nextLabel="Next"
      showFirstLast
      firstLabel="First"
      lastLabel="Last"
    />
  ),
};