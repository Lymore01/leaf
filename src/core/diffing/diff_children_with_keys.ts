import { diff } from "./diff.js";
import { KeyedChildPatch, Patch } from "../vnode/types.js";
import { VNodeBase } from "../vnode/VNodeBase.js";
import { wrapText } from "../utils/wrap_text.js";

export function diffChildrenWithKeys(
  oldChildren: Array<VNodeBase | string>,
  newChildren: Array<VNodeBase | string>
): Array<Patch | null> {
  const keyedPatches: KeyedChildPatch[] = [];
  const oldKeyedMap = new Map<string | number, VNodeBase>();
  const usedOldKeys = new Set<string | number>();
  const unkeyedOld: (VNodeBase | string)[] = [];

  for (const child of oldChildren) {
    if (typeof child === "string") {
      unkeyedOld.push(child);
    } else if (child.key != null) {
      oldKeyedMap.set(child.key, child);
    } else {
      unkeyedOld.push(child);
    }
  }

  let unkeyedIndex = 0;

  newChildren.forEach((child, i) => {
    if (typeof child === "string") {
      if (unkeyedIndex < unkeyedOld.length) {
        // patch
        const old = unkeyedOld[unkeyedIndex++];

        keyedPatches.push({
          type: "PATCH",
          index: i,
          newVNode: wrapText(child),
          oldVNode: wrapText(old),
        });
      } else {
        // insert
        keyedPatches.push({
          type: "INSERT",
          index: i,
          newVNode: wrapText(child),
        });
      }
      return;
    }

    const key = child.key;

    if (key != null && oldKeyedMap.has(key)) {
      const old = oldKeyedMap.get(key);

      usedOldKeys.add(key);

      const oldWrapped = wrapText(old);
      const newWrapped = wrapText(child);

      const patch = diff(oldWrapped, newWrapped);

      if (
        patch &&
        patch.type !== "REPLACE" &&
        patch.type !== "REMOVE" &&
        patch.type !== "TEXT"
      ) {
        keyedPatches.push({
          type: "PATCH",
          index: i,
          oldVNode: oldWrapped,
          newVNode: newWrapped,
        });
      } else {
        keyedPatches.push({
          type: "PATCH",
          index: i,
          oldVNode: oldWrapped,
          newVNode: newWrapped,
        });
      }
    } else if (key == null && unkeyedIndex < unkeyedOld.length) {
      const old = unkeyedOld[unkeyedIndex++];
      keyedPatches.push({
        type: "PATCH",
        index: i,
        oldVNode: wrapText(old),
        newVNode: wrapText(child),
      });
    } else {
      keyedPatches.push({
        type: "INSERT",
        index: i,
        newVNode: wrapText(child),
      });
    }
  });

  for (const [key, oldVNode] of oldKeyedMap.entries()) {
    if (!usedOldKeys.has(key)) {
      console.log("REMOVING old key:", key);
      keyedPatches.push({
        type: "REMOVE",
        oldVNode,
      });
    }
  }

  for (let i = unkeyedIndex; i < unkeyedOld.length; i++) {
    keyedPatches.push({
      type: "REMOVE",
      oldVNode: wrapText(unkeyedOld[i]),
    });
  }

  return [
    {
      type: "KEYED_UPDATE_CHILDREN",
      keyedPatches,
    },
  ];
}

