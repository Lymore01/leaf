import { diff } from '../diffing/diff.js';
import { applyPatch } from './patch.js';
import { renderElementNode } from './render.js';
import {
  ElementVNodeProps,
  LifecycleHookName,
  LifecycleHookFn,
} from '../../../shared/types/types.js';
import { removeNode } from './unmount.js';
import { VNodeBase } from './VNodeBase.js';

export class ElementVNode extends VNodeBase {
  type: string;
  props: Record<string, any>;
  children: VNodeBase[];
  dom?: HTMLElement;
  hooks?: Map<LifecycleHookName, LifecycleHookFn[LifecycleHookName]>;
  attachedListeners?: Map<string, EventListener>;
  key?: string | number | undefined;

  constructor({ type, props, children }: ElementVNodeProps) {
    super();
    this.type = type;
    this.props = props;
    this.children = children;
    this.hooks = new Map<
      LifecycleHookName,
      LifecycleHookFn[LifecycleHookName]
    >();
    this.attachedListeners = new Map<string, EventListener>();
  }

  private callHook<K extends LifecycleHookName>(
    name: K,
    arg?: Parameters<LifecycleHookFn[K]>[0]
  ): ReturnType<LifecycleHookFn[K]> | undefined {
    const hook = this.hooks?.get(name);
    if (hook) {
      const result = (hook as any)(arg);
      return result;
    }
    return undefined;
  }

  mount(): HTMLElement {
    const el = renderElementNode(this);

    this.callHook('onMount');

    return el;
  }

  patch(newNode: ElementVNode): void {
    const patch = diff(this, newNode);
    applyPatch(this, patch);

    this.props = newNode.props;
    this.children = newNode.children;

    this.callHook('onUpdate', newNode);
  }

  unmount(): void {
    for (const [eventName, handler] of this.attachedListeners?.entries()!) {
      this.dom?.removeEventListener(eventName, handler);
    }

    removeNode(this);

    this.attachedListeners?.clear();
    this.callHook('onUnmount');
  }
}
