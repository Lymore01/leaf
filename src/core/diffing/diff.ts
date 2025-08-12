import { ElementVNode } from "../vnode/ElementVNode.js";
import { TextVNode } from "../vnode/TextVNode.js";
import { VNodeBase } from "../vnode/VNodeBase.js";
import { Patch } from "../vnode/types.js";
import { diffChildren } from "./diff_children.js";
import { diffChildrenWithKeys } from "./diff_children_with_keys.js";
import { diffProps } from "./diff_props.js";
import { shouldUseKeyedDiffing } from "./diff_strategy.js";

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
    const oldChildren = oldVNode.children;
    const newChildren = newVNode.children;
    const childrenPatches = shouldUseKeyedDiffing(oldChildren, newChildren)
      ? diffChildrenWithKeys(oldChildren, newChildren)
      : diffChildren(oldChildren, newChildren);

    const noPropsChanges =
      Object.keys(propsPatch.toUpdate).length === 0 &&
      propsPatch.toRemove.length === 0;
    const noChildrenChanges = childrenPatches.every((p) => p === null);

    if (noPropsChanges && noChildrenChanges) {
      return null;
    }

    return {
      type: "UPDATE_CHILDREN",
      propsToUpdate: propsPatch.toUpdate,
      propsToRemove: propsPatch.toRemove,
      childrenPatches: childrenPatches,
    };
  }

  return { type: "REPLACE", newVNode };
}
