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
