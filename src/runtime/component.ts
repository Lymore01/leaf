// [DEPRECATED]: re

import { VNodeBase } from "../core/vnode/VNodeBase.js";

type Component = () => () => VNodeBase;

export let rootComponent: Component;
export let rootVNode: VNodeBase | null = null;

export function component_(fn: Component) {
  rootComponent = fn;
}
