import { TextVNode } from "../core/vnode/TextVNode.js";
import { VNodeBase } from "../core/vnode/VNodeBase.js";

export function wrapText(node: VNodeBase | string | undefined): VNodeBase {
  if (node === undefined || node === null) {
    return new TextVNode("");
  }

  if (typeof node === "string") {
    return new TextVNode(node);
  }

  return node;
}
