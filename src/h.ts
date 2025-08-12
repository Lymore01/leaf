import { ElementVNode } from "./core/vnode/ElementVNode";
import { TextVNode } from "./core/vnode/TextVNode";
import { VNodeBase } from "./core/vnode/VNodeBase";

function normalizeChildren(children: (VNodeBase | string)[]): VNodeBase[] {
  return children.map((child) =>
    typeof child === "string" ? new TextVNode(child) : child
  );
}

export function h(
  tag: string,
  props: any = {},
  children: (VNodeBase | string)[]
) {
  const { key, ...rest } = props;
  const vNode = new ElementVNode({
    type: tag,
    props: rest,
    children: normalizeChildren(children),
  });

  if (key !== undefined) {
    vNode.key = key;
  }
  return vNode;
}
