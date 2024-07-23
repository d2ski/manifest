import { inject, InjectionToken, PLATFORM_ID } from '@angular/core';

export const LOCAL_STORAGE = new InjectionToken<Storage | null>(
  'local storage',
  {
    providedIn: 'root',
    factory: () => {
      if (inject(PLATFORM_ID) === 'browser') {
        return window.localStorage;
      }

      return null;
    },
  }
);
