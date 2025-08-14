import { VNodeBase } from "../vnode/VNodeBase.js";

function hasKey(child: VNodeBase | string): boolean {
  return typeof child !== "string" && child.key != null;
}

function anyKeyed(children: Array<VNodeBase | string>): boolean {
  return children.some(hasKey);
}

function hasMixedKeyUsage(children: Array<VNodeBase | string>): boolean {
  let hasKeyed = false;
  let hasUnkeyed = false;

  for (const child of children) {
    if (typeof child === "string") {
      hasUnkeyed = true;
    } else if (child.key != null) {
      hasKeyed = true;
    } else {
      hasUnkeyed = true;
    }

    if (hasKeyed && hasUnkeyed) return true;
  }

  return false;
}

export function shouldUseKeyedDiffing(
  oldChildren: Array<VNodeBase | string>,
  newChildren: Array<VNodeBase | string>,
  warnOnMixedKeys = true
): boolean {
  const useKeyed = anyKeyed(oldChildren) || anyKeyed(newChildren);

  if (warnOnMixedKeys) {
    const allChildren = oldChildren.concat(newChildren);
    if (hasMixedKeyUsage(allChildren)) {
      console.warn(
        "[VNode Diff] Mixed usage of keyed and unkeyed children detected. This may lead to inefficient DOM updates or unexpected behavior."
      );
    }
  }

  return useKeyed;
}
