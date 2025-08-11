import { ElementVNode } from "./vnode/ElementVNode.js";
import { TextVNode } from "./vnode/TextVNode.js";
import { LifecycleHookName } from "./vnode/types.js";
import { VNodeBase } from "./vnode/VNodeBase.js";

const hookKeys: LifecycleHookName[] = ["onMount", "onUnmount", "onUpdate"];

export function renderElementNode(vElementNode: ElementVNode): HTMLElement {
  const el = document.createElement(vElementNode.type);

  if (!vElementNode.hooks) {
    vElementNode.hooks = new Map();
  }

  if (!vElementNode.attachedListeners) {
    vElementNode.attachedListeners = new Map();
  }

  for (const [key, value] of Object.entries(vElementNode.props)) {
    if (key.startsWith("on") && typeof value === "function") {
      if (hookKeys.includes(key as LifecycleHookName)) {
        vElementNode.hooks.set(key as LifecycleHookName, value);
      } else {
        const eventName = key.slice(2).toLowerCase();
        el.addEventListener(eventName, value);
        vElementNode.attachedListeners?.set(eventName, value);
      }
    } else {
      el.setAttribute(key, value);
    }
  }

  /*   for (const child of vElementNode.children) {
    if (typeof child === "string") {
      const textNode = new TextVNode(child);
      el.appendChild(textNode.mount());
      vElementNode.children.push(textNode);
    } else if (child instanceof VNodeBase) {
      el.appendChild(child.mount());
    }
  } */

  for (const child of vElementNode.children) {
    el.appendChild(child.mount());
  }

  vElementNode.dom = el;
  return el;
}

export function renderTextNode(vTextNode: TextVNode): Text {
  return document.createTextNode(vTextNode.text);
}
