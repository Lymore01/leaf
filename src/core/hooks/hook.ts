import { scheduleUpdate } from "../scheduler/scheduler.js";

type CleanUpFn = () => void;
type EffectFn = () => void | CleanUpFn;

let currentHookIndex = 0;
let currentHooks: any[] = [];

export function prepareHooksForRender() {
  currentHookIndex = 0;
}

export function seed<T>(
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const hookIndex = currentHookIndex;

  if (currentHooks.length <= hookIndex) {
    
    // avoid closure staleness
    const state: { value: T } = { value: initialValue };

    const setState = (value: T | ((prev: T) => T)) => {
      const currentValue = state.value;
      const nextValue =
        typeof value === "function"
          ? (value as (prev: T) => T)(currentValue)
          : value;

      if (currentValue !== nextValue) {
        state.value = nextValue;
        scheduleUpdate(rerender);
      }
    };

    currentHooks[hookIndex] = [state, setState];
  }

  const [state, setState] = currentHooks[hookIndex];
  currentHookIndex++; // for the next hook

  return [state.value, setState];
}


export function useMemo<T>(factory: () => T): T {
  const hookIndex = currentHookIndex;

  if (currentHooks.length <= hookIndex) {
    currentHooks[hookIndex] = factory();
  }

  const value = currentHooks[hookIndex];
  currentHookIndex++;

  return value;
}

export function watch(effect: EffectFn, deps?: unknown[]) {
  const hookIndex = currentHookIndex;

  const prevCleanup = currentHooks[hookIndex]?.cleanup;

  const prevDeps = currentHooks[hookIndex]?.deps;

  if (deps && prevDeps && areDepsEqual(prevDeps, deps)) {
    return;
  }

  queuePostRenderEffect(() => {
    if (typeof prevCleanup === "function") {
      prevCleanup();
    }

    const cleanup = effect();
    currentHooks[hookIndex] = { cleanup, deps };
  });

  currentHookIndex++;
}

const postRenderQueue: (() => void)[] = [];

export function flushPostRenderEffects() {
  while (postRenderQueue.length > 0) {
    const effect = postRenderQueue.shift();
    effect?.();
  }
}

function queuePostRenderEffect(fn: () => void) {
  postRenderQueue.push(fn);
}

// shallow comparison
function areDepsEqual(prevDeps: unknown[], nextDeps: unknown[]): boolean {
  if (prevDeps.length !== nextDeps.length) {
    return false;
  }

  for (let i = 0; i < prevDeps.length; i++) {
    if (prevDeps[i] !== nextDeps[i]) {
      return false;
    }
  }

  return true;
}

let rerender = () => {};

// inject the renderer function from outside
export function setRerenderFn(fn: () => void) {
  rerender = fn;
}
