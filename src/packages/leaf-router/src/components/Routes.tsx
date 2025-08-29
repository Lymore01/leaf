import { seed, watch } from "../../../../core/hooks/hook";
import type { PropsWithChildren } from "../../../../core/vnode/types";
import { RoutePlaceholder } from "../core/RoutePlaceHolder";

export const Routes = (props: PropsWithChildren) => {
  const routes: RoutePlaceholder[] = [];

  // todo: move this to a better place
  watch(() => {
    const navigationEntry = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    if (navigationEntry?.type === "reload") {
      console.log("Page reload detected");
    }
  });

  const childrenArray = Array.isArray(props.children)
    ? props.children
    : [props.children];

  for (const child of childrenArray) {
    if (child instanceof RoutePlaceholder) {
      routes.push(child);
    }
  }

  const currentPath = window.location.pathname;
  const matched =
    routes.find((r) => r.routeProps.path === currentPath) ??
    routes.find((r) => r.routeProps.path === "*");

  return matched?.routeProps.element ?? null;
};
