import { diff } from "../diffing/diff.js";
import { applyPatch } from "./patch.js";
import { renderFragmentNode } from "./render.js";
import { removeNode } from "./unmount.js";
import { VNodeBase } from "./VNodeBase.js";

export class FragmentNode extends VNodeBase {
  children: VNodeBase[];

  constructor(children: VNodeBase[]) {
    super();
    this.children = children;
  }

  mount(): DocumentFragment {
    const fragment = renderFragmentNode(this);
    return fragment;
  }

  patch(newNode: FragmentNode): void {
    const patch = diff(this, newNode);
    applyPatch(this, patch);

    this.children = newNode.children;
  }

  unmount(): void {
    removeNode(this);
  }
}
