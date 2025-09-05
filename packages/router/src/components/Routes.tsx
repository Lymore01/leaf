import type { PropsWithChildren } from '@shared/types';
import { RoutePlaceholder } from '../core/RoutePlaceHolder';
import { currentPath } from '../core/router-state';

export const Routes = (props: PropsWithChildren) => {
  const routes: RoutePlaceholder[] = [];

  const childrenArray = Array.isArray(props.children)
    ? props.children
    : [props.children];

  for (const child of childrenArray) {
    if (child instanceof RoutePlaceholder) {
      routes.push(child);
    }
  }

  const _currentPath = currentPath.value ?? window.location.pathname;

  console.log('Current Path in Routes:', _currentPath);

  const matched =
    routes.find((r) => r.routeProps.path === _currentPath) ??
    routes.find((r) => r.routeProps.path === '*');

  return matched?.routeProps.element ?? null;
};
