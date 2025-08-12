import { wrapText } from "../utils/wrap_text";
import { Patch } from "../vnode/types";
import { VNodeBase } from "../vnode/VNodeBase";
import { diff } from "./diff";

// this uses indexes

export function diffChildren(
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