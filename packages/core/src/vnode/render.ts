import { ElementVNode } from './ElementVNode.js';
import { FragmentNode } from './FragmentNode.js';
import { TextVNode } from './TextVNode.js';
import { LifecycleHookName } from '../../../shared/types/types.js';
import { VNodeBase } from './VNodeBase.js';

// todo: Fix me
const hookKeys: LifecycleHookName[] = ['onMount', 'onUnmount', 'onUpdate'];

export function renderElementNode(vElementNode: ElementVNode): HTMLElement {
  const el = document.createElement(vElementNode.type);

  if (!vElementNode.hooks) {
    vElementNode.hooks = new Map();
  }

  if (!vElementNode.attachedListeners) {
    vElementNode.attachedListeners = new Map();
  }

  for (const [key, value] of Object.entries(vElementNode.props)) {
    if (key.startsWith('on') && typeof value === 'function') {
      if (hookKeys.includes(key as LifecycleHookName)) {
        vElementNode.hooks.set(key as LifecycleHookName, value);
      } else {
        const eventName = key.slice(2).toLowerCase();
        el.addEventListener(eventName, value);
        vElementNode.attachedListeners?.set(eventName, value);
      }
    } else if (key === 'style') {
      const styleValue = vElementNode.props.style;
      if (typeof styleValue === 'string') {
        el.setAttribute('style', styleValue);
      } else if (typeof styleValue === 'object' && styleValue !== null) {
        for (const [styleProp, styleVal] of Object.entries(styleValue)) {
          // @ts-ignore - allow dynamic styles
          el.style[styleProp] = styleVal;
        }
      }
    } else if (key === 'tw' || key === 'className' || key === 'class') {
      el.setAttribute('class', value);
    } else {
      el.setAttribute(key, value);
    }
  }

  for (const child of vElementNode.children) {
    el.appendChild(child.mount());
  }

  vElementNode.dom = el;
  return el;
}

export function renderTextNode(vTextNode: TextVNode): Text {
  return document.createTextNode(vTextNode.text);
}

export function renderFragmentNode(fragmentNode: VNodeBase) {
  const fragment = document.createDocumentFragment();

  if (fragmentNode instanceof FragmentNode) {
    for (const child of fragmentNode.children) {
      fragment.appendChild(child.mount());
    }
  }

  return fragment;
}
