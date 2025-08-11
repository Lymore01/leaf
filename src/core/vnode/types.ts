import { ElementVNode } from "./ElementVNode.js";
import { VNodeBase } from "./VNodeBase.js";

export type ElementVNodeProps = {
  type: string;
  props: Record<string, any> | {};
  children: VNodeBase[] | [];
};

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
    };
