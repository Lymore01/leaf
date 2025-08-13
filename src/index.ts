import { diff } from "./core/diffing/diff.js";
import { effect, reactive } from "./core/reactive.js";
import { applyPatch } from "./core/vnode/patch.js";
import { VNodeBase } from "./core/vnode/VNodeBase.js";
import { h } from "./h.js";
import { JSDOM } from "jsdom";

const dom = new JSDOM(`<!DOCTYPE html><body></body>`);
global.window = dom.window as unknown as Window & typeof globalThis;
global.document = dom.window.document;

const oldVNode = h("ul", {}, [
  h("li", { key: "a" }, ["A"]),
  h("li", { key: "b" }, ["B"]),
]);

const newVNode = h("ul", {}, [
  h("div", { key: "a" }, ["A as <div> now"]),
  h("li", { key: "b" }, ["B updated"]),
]);
;

// const oldVNode = h("ul", {}, oldChildren);
// const newVNode = h("ul", {}, newChildren);

// console.log("Old vNode: ");
// console.dir(oldVNode, { depth: null });

document.body.appendChild(oldVNode.mount());

const beforeHTML = document.body.innerHTML;

const patch = diff(oldVNode, newVNode);

// console.dir(patch, { depth: null });

applyPatch(oldVNode, patch);

const afterHTML = document.body.innerHTML;

console.log("Before Patch:\n", beforeHTML);
console.log("After Patch:\n", afterHTML);

// const state = reactive({ count: 0 });

// let oldVNode: VNodeBase | null = null;

// effect(() => {
//   const newVNode = h("div", {}, [`Count is ${state.count}`]);

//   if (oldVNode === null) {
//     const domElement = newVNode.mount();
//     document.body.appendChild(domElement);
//     oldVNode = newVNode;
//   } else {
//     const patch = diff(oldVNode, newVNode);
//     console.log(patch)
//     applyPatch(oldVNode, patch);
//   }

//   console.log("DOM:", document.body.innerHTML);
// });

// setInterval(() => {
//   state.count++;
// }, 1000);
