import { ElementVNode } from "./ElementVNode";
import { TextVNode } from "./TextVNode";
import { VNodeBase } from "./VNodeBase";

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
