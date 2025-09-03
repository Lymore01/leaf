import { RouteProps } from "../../../../core/vnode/types";
import { VNodeBase } from "../../../../core/vnode/VNodeBase";

export class RoutePlaceholder extends VNodeBase {
  readonly routeProps: RouteProps;

  constructor(routeProps: RouteProps) {
    super();
    this.routeProps = routeProps;
  }

  mount(): Node {
    return document.createComment("RoutePlaceholder");
  }

  patch(next: VNodeBase): void {}

  unmount(): void {}
}
