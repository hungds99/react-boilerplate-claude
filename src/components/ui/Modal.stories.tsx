import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from './Button';

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    onClose: { action: 'closed' },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalWithControls = ({ size, title, children, footer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size={size}
        title={title}
        footer={footer}
      >
        {children}
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => (
    <ModalWithControls size="md" title="Modal Title">
      <p>This is a simple modal dialog box.</p>
    </ModalWithControls>
  ),
};

export const WithoutTitle: Story = {
  render: () => (
    <ModalWithControls>
      <div className="text-center py-4">
        <h3 className="text-lg font-medium mb-2">No Header Modal</h3>
        <p>This modal doesn't have a header/title section.</p>
      </div>
    </ModalWithControls>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <ModalWithControls 
      title="Confirmation"
      footer={
        <div className="flex justify-end space-x-2">
          <Button variant="outline">Cancel</Button>
          <Button>Confirm</Button>
        </div>
      }
    >
      <p>Are you sure you want to perform this action?</p>
    </ModalWithControls>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex space-x-2">
      <ModalWithControls size="sm" title="Small Modal">
        <p>This is a small modal dialog box.</p>
      </ModalWithControls>
      
      <ModalWithControls size="md" title="Medium Modal">
        <p>This is a medium modal dialog box.</p>
      </ModalWithControls>
      
      <ModalWithControls size="lg" title="Large Modal">
        <p>This is a large modal dialog box.</p>
      </ModalWithControls>
      
      <ModalWithControls size="xl" title="Extra Large Modal">
        <p>This is an extra large modal dialog box.</p>
      </ModalWithControls>
      
      <ModalWithControls size="full" title="Full Width Modal">
        <p>This is a full width modal dialog box.</p>
      </ModalWithControls>
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <ModalWithControls title="Terms of Service">
      <div className="space-y-4">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.</p>
      </div>
    </ModalWithControls>
  ),
};