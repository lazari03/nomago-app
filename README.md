### Listings & Properties Management
- To add or edit listings and properties, use the Strapi CMS configured for this project.
- The app fetches listing and property data from the Strapi backend; direct edits in the codebase are not needed for content changes.

### Environment Variables & Configuration
- API endpoints and other environment-specific settings are managed in the `app.config.js` file and via Expo's `extra` config.
- Update these settings if you change your backend URL or add new environment variables.
# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.


## Project Structure & Contribution Guide

This project is organized for scalability and maintainability. Here’s how to contribute and where to add new code:

### Components
- All reusable UI components live in the `components/` directory.
- To add a new UI component, create a new file or folder inside `components/`.
- For feature-specific or grouped components, use subfolders (e.g., `components/AdsComponent/`).
- Use TypeScript and follow the existing style and naming conventions.


### Screens, Tabs & Routing
- Screens are organized in the `app/` directory, using file-based routing (see [Expo Router](https://docs.expo.dev/router/introduction/)).
- To add a new screen, create a new file in the appropriate folder inside `app/`.
- For tab navigation, use the `app/(tabs)/` folder. Each file in this folder represents a tab (e.g., `app/(tabs)/explore.tsx`, `app/(tabs)/index.tsx`).
- To add a new tab, create a new file in the `app/(tabs)/` folder. The filename will become the route for that tab.
- You can customize the tab bar by editing or extending the `CustomTabBar` component in `components/`.
- Use nested folders for grouped routes (e.g., `app/booking/`).
- Navigation is handled with Expo Router and can be customized using navigation components in `components/` (e.g., `HeaderNavigation`, `HomeTabBar`).
- Reuse shared components like headers, navigation bars, and cards by importing them from the `components/` directory.

### Reusing Components
- Many UI elements (headers, navigation, cards, etc.) are already implemented in `components/` and can be reused across screens and tabs.
- To use a shared component, simply import it (e.g., `import { HeaderNavigation } from '@/components/HeaderNavigation'`).
- For consistent navigation, use the provided navigation components or extend them as needed.

### State Management (Stores)
- Global state is managed with [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction).
- All stores are in the `stores/` directory.
- To add a new store, create a new file in `stores/` and follow the existing pattern.

### API Calls & Services
- All API logic and external service calls are in the `services/` directory.
- To add a new API call, create or update a service file in `services/`.
- Use TypeScript interfaces for request/response payloads.

### Constants & Utilities
- Use the `constants/` directory for static values (colors, strings, etc.).
- Use the `utils/` directory for helper functions and custom hooks.

### Styles
- Use `StyleSheet.create` for styles in each component.
- For shared or complex styles, use a separate `.styles.ts` file in the component’s folder.

### Internationalization (i18n)
- All translations are managed in the `i18n/` directory.
- Add new keys to the appropriate language file (e.g., `i18n/en.ts`).

### Testing
- (Recommended) Add tests for new components, stores, and services.
- Suggested tools: [Jest](https://jestjs.io/) and [React Native Testing Library](https://testing-library.com/docs/react-native-testing-library/intro/).

### Best Practices
- Use TypeScript for all files.
- Keep components small and focused.
- Use hooks for logic reuse.
- Handle errors gracefully and provide user feedback.
- Write clear, concise comments for complex logic.
