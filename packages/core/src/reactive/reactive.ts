import { LeafNode } from "../vnode/types";

// use in shared state and router
export function reactive<T extends object>(target: T): T {
  console.log("Making object reactive:", target);
  return new Proxy(target, {
    get(obj, key, receiver) {
      track(obj, key);
      return Reflect.get(obj, key, receiver);
    },

    set(obj, key, value, receiver) {
      const result = Reflect.set(obj, key, value, receiver);
      trigger(obj, key);
      return result;
    },
  });
}

type EffectFn = () => void;
let activeEffect: EffectFn | null = null;

// target -> key -> effects
const targetMap = new WeakMap<object, Map<string | symbol, Set<EffectFn>>>();

// records which effect is using which state key
function track(target: object, key: string | symbol) {
  if (!activeEffect) return;
  console.log("Tracking dependency:", { target, key, effect: activeEffect.name });

  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }

  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }

  dep.add(activeEffect);
}

// reruns effects when that state key changes
function trigger(target: object, key: string | symbol) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;


  const dep = depsMap.get(key);
  if (dep) {
    dep.forEach((effect) => effect());
  }
}

// register a reactive function
export function effect(fn: () => void | (() => void)) {
  let cleanup: (() => void) | null = null;

  const runner = () => {
    if (cleanup) cleanup();

    activeEffect = runner;

    const result = fn();
    if (typeof result === "function") {
      cleanup = result;
    } else {
      cleanup = null;
    }

    activeEffect = null;
  };

  runner();
}
