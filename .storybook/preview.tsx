import type { Preview } from "@storybook/react";
import React from 'react';
import '../src/styles/index.css';
import { withThemeByClassName } from "@storybook/addon-themes";

// Set up theme and decorators for proper dark mode
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      // Don't use background colors when using themes
      default: 'transparent',
      values: [
        {
          name: 'light',
          value: '#f9fafb',
        },
        {
          name: 'dark',
          value: '#111827',
        },
        {
          name: 'transparent',
          value: 'transparent',
        },
      ],
    },
    // Add theme parameter for better theme management
    themes: {
      default: 'light',
      clearable: false,
      list: [
        { name: 'Light', class: '', color: '#f9fafb' },
        { name: 'Dark', class: 'dark', color: '#111827' },
      ],
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
    // Add wrapper for stories to properly handle dark mode styles
    (Story) => {
      return (
        <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
