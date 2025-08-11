import { ElementVNode } from "./core/vnode/ElementVNode";
import { TextVNode } from "./core/vnode/TextVNode";
import { VNodeBase } from "./core/vnode/VNodeBase";

function normalizeChildren(children: (VNodeBase | string)[]): VNodeBase[] {
  return children.map((child) =>
    typeof child === "string" ? new TextVNode(child) : child
  );
}

export function h(type: string, props: any, children: (VNodeBase | string)[]) {
  return new ElementVNode({
    type,
    props,
    children: normalizeChildren(children),
  });
}
