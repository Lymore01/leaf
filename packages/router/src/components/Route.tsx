// config-only component

import { RouteProps } from "../../../../core/vnode/types";
import { RoutePlaceholder } from "../core/RoutePlaceHolder";

export const Route = (props: RouteProps) => {
  return new RoutePlaceholder(props);
};
