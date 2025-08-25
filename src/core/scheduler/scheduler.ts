// groups multiple updates into one render cycle / tick

let isScheduled = false;
let scheduledRenderFn: (() => void) | null = null;

export function scheduleUpdate(fn: () => void) {
  scheduledRenderFn = fn;

  if (!isScheduled) {
    isScheduled = true;

    queueMicrotask(() => {
      if (scheduledRenderFn) {
        scheduledRenderFn();
      }
      isScheduled = false;
      scheduledRenderFn = null;
    });
  }
}