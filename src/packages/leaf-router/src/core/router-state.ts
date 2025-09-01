import { reactive } from "../../../../core/reactive/reactive";

export const currentPath = reactive({
  value: window.location.pathname,
});
