import { RouteProps } from '@shared/types';
import { VNodeBase } from '@core';

export class RoutePlaceholder extends VNodeBase {
  readonly routeProps: RouteProps;

  constructor(routeProps: RouteProps) {
    super();
    this.routeProps = routeProps;
  }

  mount(): Node {
    return document.createComment('RoutePlaceholder');
  }

  patch(next: VNodeBase): void {}

  unmount(): void {}
}
