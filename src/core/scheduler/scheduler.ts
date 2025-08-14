// groups multiple updates into one render cycle / tick
const updateQueue = new Set<() => void>();
let isFlushing = false;

export function scheduleUpdate(fn: () => void) {
  updateQueue.add(fn);

  if (!isFlushing) {
    isFlushing = true;

    // microtask
    Promise.resolve().then(() => {
      updateQueue.forEach((fn) => fn());
      updateQueue.clear();
      isFlushing = false;
    });
  }
}
