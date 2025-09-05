import { ElementVNode } from "./ElementVNode.js";
import { TextVNode } from "./TextVNode.js";
import { VNodeBase } from "./VNodeBase.js";

export function removeNode(node: VNodeBase) {
  if (node instanceof TextVNode) {
    node.dom?.remove();
    node.dom = undefined;
  } else if (node instanceof ElementVNode) {
    node.children.forEach((child) => {
      if (child instanceof VNodeBase) {
        child.unmount();
      }
    });
    node.dom?.remove();
    node.dom = undefined;
  }
}
