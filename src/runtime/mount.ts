import { diff } from "../core/diffing/diff.js";
import { applyPatch } from "../core/vnode/patch.js";
import { effect } from "../core/reactive/reactive.js";
import { VNodeBase } from "../core/vnode/VNodeBase.js";
import {
  flushPostRenderEffects,
  prepareHooksForRender,
  setRerenderFn,
} from "../core/hooks/hook.js";

let rootVNode: VNodeBase | null = null;
let currentComponent: () => VNodeBase;
let containerRef: HTMLElement;

export function mount_(component: () => VNodeBase, container: HTMLElement) {
  currentComponent = component;
  containerRef = container;

  const rerenderFn = () => {
    prepareHooksForRender();

    const newVNode = currentComponent();

    if (!rootVNode) {
      const dom = newVNode.mount();
      container.appendChild(dom);
      rootVNode = newVNode;
    } else {
      const patch = diff(rootVNode, newVNode);
      applyPatch(rootVNode, patch);
    }

    flushPostRenderEffects();
  };

  setRerenderFn(rerenderFn);
  effect(rerenderFn);
}

export function remount_(newComponent: () => VNodeBase) {
  // console.log("[DEBUG]: Remounting...")
  currentComponent = newComponent;
  rootVNode = null;
  containerRef.innerHTML = "";
  mount_(currentComponent, containerRef);
}
