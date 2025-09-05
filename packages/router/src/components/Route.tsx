// config-only component

import { RouteProps } from '@core';
import { RoutePlaceholder } from '../core/RoutePlaceHolder';

export const Route = (props: RouteProps) => {
  return new RoutePlaceholder(props);
};
