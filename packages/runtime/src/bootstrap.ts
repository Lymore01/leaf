import { createRouter } from '@router';
import { mount, remount } from './index';

export function bootstrap(App: any, rootSelector: string = '#root') {
  const root = document.querySelector(rootSelector) as HTMLElement;

  if (!root) {
    throw new Error(`Root element '${rootSelector}' not found.`);
  }

  createRouter(App, root, mount, remount);

  // Hot Module Replacement (HMR) - Works with Vite
  if (import.meta.hot) {
    import.meta.hot.accept((newModule) => {
      const NewApp = newModule?.App;
      if (typeof NewApp === 'function') {
        console.log('[HMR] Reloading App component...');
        remount(NewApp);
      } else {
        console.warn("[HMR] Skipped: 'App' export is missing or invalid.");
      }
    });
  }
}
