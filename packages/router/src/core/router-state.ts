import { reactive } from '@core';

export const currentPath = reactive({
  value: window.location.pathname,
});
