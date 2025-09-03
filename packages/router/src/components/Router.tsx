import { h } from "../../../../jsx/h";
import { PropsWithChildren } from "../../../../core/vnode/types";
import { currentPath } from "../core/router-state";

export const Router = (props: PropsWithChildren) => {
  if (!currentPath.value) {
    currentPath.value = window.location.pathname;
  }
  return <div>{props.children}</div>;
};
