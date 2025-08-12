export function diffProps(
  oldProps: Record<string, any>,
  newProps: Record<string, any>
): { toUpdate: Record<string, any>; toRemove: string[] } {
  const toUpdate: Record<string, any> = {};
  const toRemove: string[] = [];

  for (const key in newProps) {
    if (oldProps[key] !== newProps[key]) {
      toUpdate[key] = newProps[key];
    }
  }

  for (const key in oldProps) {
    if (!(key in newProps)) {
      toRemove.push(key);
    }
  }

  return { toUpdate, toRemove };
}