import { Foo } from "./examples/components/foo.js";
import { NotFound } from "./examples/components/not-found.js";
import { Welcome } from "./examples/components/welcome.js";
import { h } from "./jsx/h.js";
import { Route } from "./packages/leaf-router/src/components/Route.js";
import { Routes } from "./packages/leaf-router/src/components/Routes.js";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/hello" element={<Foo message="Hello world" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
