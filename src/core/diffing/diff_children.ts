import { wrapText } from "../../utils/wrap_text.js";
import { Patch } from "../vnode/types.js";
import { VNodeBase } from "../vnode/VNodeBase.js";
import { diff } from "./diff.js";


// using indexes
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