import { diff } from "../diffing/diff.js";
import { applyPatch } from "./patch.js";
import { renderTextNode } from "./render.js";
import { removeNode } from "./unmount.js";
import { VNodeBase } from "./VNodeBase.js";

let idCounter = 0;

export class TextVNode extends VNodeBase {
  text: string;
  dom?: Text;
  id = idCounter++;

  constructor(text: string) {
    super();
    this.text = text;
  }

  mount(): Text {
    this.dom = renderTextNode(this);
    return this.dom;
  }

  patch(newNode: TextVNode): void {
    if (this.text !== newNode.text) {
      const patch = diff(this, newNode);
      applyPatch(this, patch);
      this.text = newNode.text;
    }
  }

  unmount(): void {
    // delegate the removeNode function
    removeNode(this);
  }
}
