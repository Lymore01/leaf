/* import { h } from "../../jsx/h";
import { useEffect, useState } from "../../core/hooks/hook";

export const App = () => {
  
  const [count, setCount] = useState(0);

  console.log("Rendering App with count =", count);

  useEffect(() => {
    console.log("Mounted App");

    setCount(count + 1);
    setCount(count + 2);
    setCount(count + 3);

    return () => console.log("Unmounted App");
  }, []);

  useEffect(() => {
    console.log(`Effect ran for count = ${count}`);
  }, [count]);

  return h("div", {}, [`Count: ${count}`]);
};
 */

import { JSDOM } from "jsdom"
import { h } from "../src/jsx/h";
import { VNodeBase } from "../src/core/vnode/VNodeBase";
import { diff } from "../src/core/diffing/diff";
// fix patching issues for text node

const document = new JSDOM('<!DOCTYPE html><html><body></body></html>');
const { body } = document.window.document

const oldNode = h("div", null, ["hello, world"])

const newVNode = h('div', null, 'Hello, Leaf!');

const patch = diff(oldNode, newVNode);

console.log("Patch: ", patch)