
import { App } from "./app.js";
import { mount } from "./runtime/index.js";

const root = document.getElementById("root") as HTMLElement;

mount(App, root); 
