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
    currentHooks[hookIndex] = initialValue;
  }

  const setState = (value: T | ((prev: T) => T)) => {
    const prevValue = currentHooks[hookIndex];
    const nextValue =
      typeof value === "function"
        ? (value as (prev: T) => T)(prevValue)
        : value;

    currentHooks[hookIndex] = nextValue;
    
    //! fix: scheduleUpdate causes bugs
    // scheduleUpdate(rerender);
    rerender()
  };

  const state = currentHooks[hookIndex];
  currentHookIndex++;

  return [state, setState];
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
