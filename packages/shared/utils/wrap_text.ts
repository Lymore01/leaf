import { TextVNode, VNodeBase } from '@core';

export function wrapText(node: VNodeBase | string | undefined): VNodeBase {
  if (node === undefined || node === null) {
    return new TextVNode('');
  }

  if (typeof node === 'string') {
    return new TextVNode(node);
  }

  return node;
}
