import { sampleRouters } from "../shared/constants";

// get the current path
export function getCurrentPath() {
  return window.location.pathname;
}

// navigate to the new path
export function navigateTo(path: string) {
  // get the component from the path
  sampleRouters.hasOwnProperty(path)
    ? window.history.pushState({}, "", path)
    : window.history.pushState({}, "", "*");

    // dispatch the event to notify the router
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);

    return;
}
