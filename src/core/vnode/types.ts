import { VNodeBase } from "./VNodeBase.js";

export type ElementVNodeProps = {
  type: string;
  props: Record<string, any> | {};
  children: VNodeBase[] | [];
};

export type LeafNode =
  | VNodeBase
  | HTMLElement
  | Text
  | Comment
  | DocumentFragment
  | LeafNode[]
  | string
  | number
  | boolean
  | null
  | undefined;

export type PropsWithChildren<P = {}> = P & { children?: LeafNode | null };

export type RouteProps = {
  path: string;
  element: LeafNode;
}

export type TextVNodeProps = {
  text: string;
};

export type VNodeProps = ElementVNodeProps | TextVNodeProps;

export type LifecycleHookFn = {
  onMount: () => void;
  onUnmount: () => void;
  onUpdate: (newNode: VNodeBase) => void;
  // todo: Add more
};

export type LifecycleHookName = keyof LifecycleHookFn;

export type Patch =
  | { type: "REPLACE"; newVNode: VNodeBase }
  | { type: "REMOVE" }
  | { type: "TEXT"; newText: string }
  | {
      type: "UPDATE_CHILDREN";
      propsToUpdate: Record<string, any>;
      propsToRemove: string[];
      childrenPatches: Array<Patch | null>;
    }
  | {
      type: "KEYED_UPDATE_CHILDREN";
      keyedPatches: KeyedChildPatch[];
    };

export type KeyedChildPatch =
  | {
      type: "INSERT";
      index: number;
      newVNode: VNodeBase;
    }
  | {
      type: "REMOVE";
      oldVNode: VNodeBase;
    }
  | {
      type: "PATCH";
      index: number;
      oldVNode: VNodeBase;
      newVNode: VNodeBase;
    };
