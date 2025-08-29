```ts

import { App } from "./app.js";
import { mount, remount } from "./runtime/index.js";
import { initRouter, getCurrentComponent } from "leaf-router";
import "./app.css"

const root = document.getElementById("root") as HTMLElement;

initRouter(() => {
  const Component = getCurrentComponent(App);
  mount(Component, root);
});

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


// app.tsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/about" element={<AboutPage />} />
  <Route path="*" element={<NotFound />} />
</Routes>

```