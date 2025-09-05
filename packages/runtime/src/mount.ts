import {
  diff,
  applyPatch,
  VNodeBase,
  flushPostRenderEffects,
  prepareHooksForRender,
  setRerenderFn,
  effect,
} from '@core';

let rootVNode: VNodeBase | null = null;
let currentComponent: () => VNodeBase;
let containerRef: HTMLElement;

export function _mount(component: () => VNodeBase, container: HTMLElement) {
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

  // rerenderFn();
  effect(rerenderFn);
}

export function _remount(newComponent: () => VNodeBase) {
  currentComponent = newComponent;
  rootVNode = null;
  containerRef.innerHTML = '';

  _mount(currentComponent, containerRef);
}
