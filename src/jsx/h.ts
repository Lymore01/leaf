import { ElementVNode } from "../core/vnode/ElementVNode.js";
import { FragmentNode } from "../core/vnode/FragmentNode.js";
import { TextVNode } from "../core/vnode/TextVNode.js";
import { VNodeBase } from "../core/vnode/VNodeBase.js";
import { RoutePlaceholder } from "../packages/leaf-router/src/core/RoutePlaceHolder.js";

export const Fragment = Symbol("Fragment");

function normalizeChildren(children: any): VNodeBase[] {
  if (!children) return [];

  if (!Array.isArray(children)) {
    children = [children];
  }

  return children.flat().map((child: any) => {
    if (child === null || child === undefined || typeof child === "boolean") {
      return new TextVNode("");
    }
    if (typeof child === "string" || typeof child === "number") {
      return new TextVNode(String(child));
    }
    if (child instanceof VNodeBase) {
      return child;
    }
    return new TextVNode(String(child));
  });
}

export function h(
  tag: string | Symbol | Function,
  props: any = {},
  ...children: any[]
) {
  const safeProps = props || {};
  const { key, ...rest } = safeProps;

  if (tag === Fragment) {
    return new FragmentNode(normalizeChildren(children));
  }

  if (typeof tag === "function") {
    if (children.length > 0) {
      rest.children = normalizeChildren(children);
    }

    let componentVNode = tag(rest);

    if (key !== undefined) {
      (componentVNode as ElementVNode).key = key;
    }
    return componentVNode;
  }

  const vNode = new ElementVNode({
    type: tag as string,
    props: rest,
    children: normalizeChildren(children),
  });

  if (key !== undefined) {
    vNode.key = key;
  }
  return vNode;
}
