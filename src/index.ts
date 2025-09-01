// import { App } from "./app.js";
// import "./app.css";
// import { bootstrap } from "./runtime/bootstrap.js";

// bootstrap(App);

import { App } from "./app.js";
import { mount, remount } from "./runtime/index.js";
import "./app.css";

const root = document.getElementById("root") as HTMLElement;

window.addEventListener("popstate", () => {
  console.log("[Router] Detected popstate event, remounting App...");
  remount(App);
});

mount(App, root);

// HMR support
if (import.meta.hot) {
  import.meta.hot.accept("./app.js", (newModule) => {
    const NewApp = newModule?.App;

    if (typeof NewApp === "function") {
      console.log("[HMR] Reloading App component...");
      remount(NewApp);
    } else {
      console.warn("[HMR] Skipped: 'App' export is missing or invalid.");
    }
  });
}
