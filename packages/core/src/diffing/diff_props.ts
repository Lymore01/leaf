export function diffProps(
  oldProps: Record<string, any>,
  newProps: Record<string, any>
): {
  toUpdate: Record<string, any>;
  toRemove: string[];
} {
  const toUpdate: Record<string, any> = {};
  const toRemove: string[] = [];

  for (const key in newProps) {
    const oldVal = oldProps[key];
    const newVal = newProps[key];

    const isEvent = key.startsWith("on") && typeof newVal === "function";

    
    if (isEvent) {
      if (oldVal !== newVal) {
        toUpdate[key] = newVal;
      }
    } else {
      if (oldVal !== newVal) {
        toUpdate[key] = newVal;
      }
    }
  }

  for (const key in oldProps) {
    if (!(key in newProps)) {
      toRemove.push(key);
    }
  }

  return { toUpdate, toRemove };
}
