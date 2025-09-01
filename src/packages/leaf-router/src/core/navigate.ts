import { currentPath } from "./router-state";

export function navigate(path: string): void {
  // manually dispatch a popstate event to inform any listeners of the navigation change
  // const navEvent = new PopStateEvent("popstate");
  // dispatchEvent(navEvent);

  if (window.location.pathname !== path) {
    history.pushState({}, "", path);
    currentPath.value = path;
  }
}
