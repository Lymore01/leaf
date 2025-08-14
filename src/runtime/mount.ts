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

export function mount_(component: () => VNodeBase, container: HTMLElement) {
  const rerenderFn = () => {
    prepareHooksForRender();

    const newVNode = component();

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
