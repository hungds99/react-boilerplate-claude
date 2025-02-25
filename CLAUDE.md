# React TypeScript Tailwind CSS Boilerplate

## Build & Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check for code issues
- `npm run storybook` - Start Storybook component development environment
- `npm run build-storybook` - Build Storybook for static hosting

## Code Style Guidelines
- **TypeScript**: Use strict typing with `noUnusedLocals` and `noUnusedParameters` enabled
- **Imports**: Use path aliases (`@/*`) for imports from src directory
- **Components**: Use functional components with explicit return types
- **Naming**: PascalCase for components, camelCase for functions/variables
- **File Structure**: Group by feature, with components in `components/`, pages in `pages/`
- **Error Handling**: Use try/catch blocks with specific error types
- **Dark Mode**: Use 'class' strategy with Tailwind's darkMode feature
- **Theme**: Use primary color palette defined in tailwind.config.js
- **Testing**: Component tests should accompany component files

## Common Patterns
- Use React Router for navigation (`react-router-dom`)
- Use context for global state management (see AuthContext)
- Use custom hooks for shared logic (e.g., useDarkMode, useLocalStorage)
- Use Storybook for component development and documentation

## API Data Fetching
- Use React Query (@tanstack/react-query) for data fetching and cache management
- Structure api calls:
  - Create type definitions in `src/types/api.ts`
  - Create service functions in `src/services/[resourceName]Service.ts`
  - Create reusable hooks in `src/hooks/use[ResourceName].ts`
  - For generic API operations, use the hooks in `src/hooks/useApiQuery.ts`
- Query keys should follow a consistent pattern for proper cache invalidation