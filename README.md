# React 19 with TailwindCSS 4.0.8 Boilerplate

A modern, lightweight boilerplate for React applications using the latest versions of React 19 and TailwindCSS 4.0.8.

## Features

- 🚀 **React 19** - Using the latest stable React version
- 📝 **TypeScript** - Type-safe code with the latest TypeScript
- 🎨 **TailwindCSS 4.0.8** - Using the latest stable Tailwind version
- 🌓 **Dark Mode** - Built-in dark mode support with theme switching (light/dark/system)
- ⚡ **Vite** - Next Generation Frontend Tooling for fast development
- 🧭 **React Router** - Declarative routing for React applications
- 🔄 **Absolute Imports** - Import components using `@/` prefix
- 🧰 **Custom Hooks** - Useful custom hooks like `useLocalStorage` and `useDarkMode`
- 🌐 **API Utils** - Reusable API utilities with TypeScript generics
- 🎯 **Component Library** - Pre-built UI components with variants, sizes, and states
- 🔐 **Authentication** - Ready-to-use sign in, sign up, and forgot password pages

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone this repository
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the development server
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Run the development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Project Structure

```
/
├── public/             # Static files
├── src/
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable components
│   │   ├── ui/         # UI primitives
│   │   │   ├── Alert.tsx      # Alert component with variants
│   │   │   ├── Avatar.tsx     # Avatar component with sizes and status
│   │   │   ├── Badge.tsx      # Badge component with variants
│   │   │   ├── Button.tsx     # Button with variants, sizes, loading state
│   │   │   ├── Card.tsx       # Card component with header, body, footer
│   │   │   ├── Input.tsx      # Input component with validation
│   │   │   └── index.ts       # Exports all UI components
│   │   ├── Navbar.tsx         # Navigation with mobile responsiveness
│   │   └── ThemeSwitcher.tsx  # Dark mode toggle (light/dark/system)
│   ├── hooks/          # Custom React hooks
│   │   ├── useLocalStorage.ts  # localStorage hook with TypeScript generics
│   │   └── useDarkMode.ts      # Dark mode hook with system preference
│   ├── pages/          # Page components
│   │   ├── Home.tsx           # Home page with interactive examples
│   │   ├── SignIn.tsx         # Sign in page
│   │   ├── SignUp.tsx         # Sign up page
│   │   └── ForgotPassword.tsx # Forgot password page
│   ├── styles/         # Global styles 
│   │   └── index.css   # TailwindCSS imports & custom styles
│   ├── utils/          # Utility functions
│   │   └── api.ts      # API utilities with TypeScript generics
│   ├── App.tsx         # Main App component with routing
│   └── main.tsx        # Entry point using React 19 syntax
├── .env.example        # Example environment variables
├── .gitignore
├── index.html
├── package.json        # Dependencies and scripts
├── postcss.config.js   # PostCSS config
├── tailwind.config.js  # TailwindCSS 4 config with latest features
├── tsconfig.json       # TypeScript config
├── tsconfig.node.json  # Node.js TypeScript config
└── vite.config.ts      # Vite configuration with path aliases
```

## TailwindCSS 4.0.8 Features

This boilerplate uses TailwindCSS 4.0.8 which includes:
- Improved performance with optimized build times
- New color system with expanded palette
- Enhanced utility classes and components
- Built-in dark mode support
- Latest JIT compiler for lightning-fast development
- Simplified configuration options
- Expanded responsive utilities

## React 19 Features

This boilerplate uses React 19 which includes:
- Improved performance and optimizations
- Enhanced TypeScript integration
- Updated React hooks API
- Better error handling and debugging
- Modern component patterns
- Simplified imports and module structure

## License

MIT