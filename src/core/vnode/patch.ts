import { diff } from "../diffing/diff.js";
import { ElementVNode } from "./ElementVNode.js";
import { TextVNode } from "./TextVNode.js";
import { Patch } from "./types.js";
import { VNodeBase } from "./VNodeBase.js";

export function applyPatch(oldVNode: VNodeBase, patch: Patch | null) {
  if (!patch) return null;

  switch (patch.type) {
    case "REPLACE": {
      const newDom = patch.newVNode.mount();
      if (oldVNode.dom && "replaceWith" in oldVNode.dom) {
        (oldVNode.dom as ChildNode).replaceWith(newDom);
      }

      patch.newVNode.dom = newDom;
      break;
    }

    case "REMOVE": {
      oldVNode.unmount();
      break;
    }

    case "TEXT": {
      if (oldVNode instanceof TextVNode && oldVNode.dom) {
        console.log(
          `Patching TextVNode #${oldVNode.id} from "${oldVNode.text}" to "${patch.newText}"`
        );
        oldVNode.dom.textContent = patch.newText;
        oldVNode.dom.textContent = patch.newText;
        oldVNode.text = patch.newText;
      }
      break;
    }

    // ! fix: mixing elements of different types, all with keys, causes a reference error

    case "KEYED_UPDATE_CHILDREN": {
      if (!(oldVNode instanceof ElementVNode) || !oldVNode.dom) break;

      const parentEl = oldVNode.dom.parentElement;
      console.log("Parent element (overwritten): ", parentEl);

      for (const childPatch of patch.keyedPatches) {
        if (childPatch.type === "REMOVE") {
          childPatch.oldVNode.unmount();
        }
      }

      for (const childPatch of patch.keyedPatches) {
        switch (childPatch.type) {
          case "INSERT": {
            const newDom = childPatch.newVNode.mount();
            const refNode = parentEl?.childNodes[childPatch.index] || null;
            parentEl?.insertBefore(newDom, refNode);
            childPatch.newVNode.dom = newDom;
            break;
          }

          case "PATCH": {
            const innerPatch = diff(childPatch.oldVNode, childPatch.newVNode);
            applyPatch(childPatch.oldVNode, innerPatch);
            break;
          }
        }
      }

      break;
    }

    case "UPDATE_CHILDREN": {
      if (oldVNode instanceof ElementVNode && oldVNode.dom) {
        const el = oldVNode.dom;

        // update props
        for (const key of patch.propsToRemove) {
          if (key.startsWith("on")) {
            const eventName = key.slice(2).toLowerCase();
            const oldHandler = oldVNode.props[key];
            if (typeof oldHandler === "function") {
              el.removeEventListener(eventName, oldHandler);
              oldVNode.attachedListeners?.delete(eventName);
            }
          } else {
            el.removeAttribute(key);
          }
        }

        // props to update
        for (const [key, value] of Object.entries(patch.propsToUpdate)) {
          if (key.startsWith("on") && typeof value === "function") {
            const eventName = key.slice(2).toLowerCase();

            const oldHandler = oldVNode.props[key];
            if (typeof oldHandler === "function") {
              el.removeEventListener(eventName, oldHandler);
              oldVNode.attachedListeners?.delete(eventName);
            }
            el.addEventListener(eventName, value);
            oldVNode.attachedListeners?.set(eventName, value);
          } else {
            el.setAttribute(key, value);
          }
        }

        for (let i = 0; i < patch.childrenPatches.length; i++) {
          const childPatch = patch.childrenPatches[i]; // new
          const oldChild = oldVNode.children[i];

          if (childPatch) {
            if (oldChild instanceof VNodeBase) {
              applyPatch(oldChild, childPatch);
            }
          }
        }
      } else if ("children" in oldVNode && Array.isArray(oldVNode.children)) {
        for (let i = 0; i < patch.childrenPatches.length; i++) {
          const childPatch = patch.childrenPatches[i];
          const oldChild = oldVNode.children[i];
          if (childPatch && oldChild instanceof VNodeBase) {
            applyPatch(oldChild, childPatch);
          }
        }
      }

      break;
    }
  }
}
