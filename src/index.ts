import { diff } from "./core/diff.js";
import { effect, reactive } from "./core/reactive.js";
import { applyPatch } from "./core/vnode/patch.js";
import { VNodeBase } from "./core/vnode/VNodeBase.js";
import { h } from "./h.js";
import { JSDOM } from "jsdom";

const dom = new JSDOM(`<!DOCTYPE html><body></body>`);
global.window = dom.window as unknown as Window & typeof globalThis;
global.document = dom.window.document;

const state = reactive({ count: 0 });

let oldVNode: VNodeBase | null = null;

effect(() => {
  const newVNode = h("div", {}, [`Count is ${state.count}`]);

  if (oldVNode === null) {
    const domElement = newVNode.mount();
    document.body.appendChild(domElement);
    oldVNode = newVNode;
  } else {
    const patch = diff(oldVNode, newVNode);
    console.log(patch)
    applyPatch(oldVNode, patch);
  }

  console.log("DOM:", document.body.innerHTML);
});

setInterval(() => {
  state.count++;
}, 1000);
