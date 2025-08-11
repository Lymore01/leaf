import { ElementVNode } from "./vnode/ElementVNode.js";
import { TextVNode } from "./vnode/TextVNode.js";
import { VNodeBase } from "./vnode/VNodeBase.js";
import { Patch } from "./vnode/types.js";

export function diff(
  oldVNode: VNodeBase | null,
  newVNode: VNodeBase | null
): Patch | null {
  if (oldVNode == null && newVNode == null) return null;

  if (oldVNode == null && newVNode != null) {
    return { type: "REPLACE", newVNode };
  }

  if (newVNode == null) {
    return { type: "REMOVE" };
  }

  if (oldVNode instanceof ElementVNode && newVNode instanceof ElementVNode) {
    if (oldVNode.type !== newVNode.type) {
      return { type: "REPLACE", newVNode };
    }
  }

  if (oldVNode instanceof TextVNode && newVNode instanceof TextVNode) {
    if (oldVNode.text !== newVNode.text) {
      return { type: "TEXT", newText: newVNode.text };
    }
    return null;
  }

  if (oldVNode instanceof ElementVNode && newVNode instanceof ElementVNode) {
    const propsPatch = diffProps(oldVNode.props, newVNode.props);
    const childrenPatch = diffChildren(oldVNode.children, newVNode.children);

    const noPropsChanges =
      Object.keys(propsPatch.toUpdate).length === 0 &&
      propsPatch.toRemove.length === 0;
    const noChildrenChanges = childrenPatch.every((p) => p === null);

    if (noPropsChanges && noChildrenChanges) {
      return null;
    }

    return {
      type: "UPDATE_CHILDREN",
      propsToUpdate: propsPatch.toUpdate,
      propsToRemove: propsPatch.toRemove,
      childrenPatches: childrenPatch,

    };
  }

  return { type: "REPLACE", newVNode };
}

function diffProps(
  oldProps: Record<string, any>,
  newProps: Record<string, any>
): { toUpdate: Record<string, any>; toRemove: string[] } {
  const toUpdate: Record<string, any> = {};
  const toRemove: string[] = [];

  for (const key in newProps) {
    if (oldProps[key] !== newProps[key]) {
      toUpdate[key] = newProps[key];
    }
  }

  for (const key in oldProps) {
    if (!(key in newProps)) {
      toRemove.push(key);
    }
  }

  return { toUpdate, toRemove };
}

function diffChildren(
  oldChildren: Array<VNodeBase | string>,
  newChildren: Array<VNodeBase | string>
): Array<Patch | null> {
  const patches: Array<Patch | null> = [];
  const maxLen = Math.max(oldChildren.length, newChildren.length);

  for (let i = 0; i < maxLen; i++) {
    const oldChild = wrapText(oldChildren[i]);
    const newChild = wrapText(newChildren[i]);
    patches.push(diff(oldChild, newChild));
  }

  return patches;
}

function wrapText(node: VNodeBase | string | undefined): VNodeBase | null {
  if (node == null) return null;
  if (typeof node === "string") return new TextVNode(node);
  return node;
}

