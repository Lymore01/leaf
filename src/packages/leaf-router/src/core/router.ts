import { VNodeBase } from "../../../../core/vnode/VNodeBase";

type MountFn = (component: () => VNodeBase, root: HTMLElement) => void;

export function createRouter(
  app: any,
  root: HTMLElement,
  mount: MountFn,
  remount: (component: () => VNodeBase) => void
) {
  mount(app, root);

  window.addEventListener("popstate", () => {
    console.log("[Router] Detected popstate event, remounting App...");
    remount(app);
  });
}
