import { h } from "./jsx/h.js";
import { Foo } from "./examples/components/foo.js";
import { NotFound } from "./examples/components/not-found.js";
import { Welcome } from "./examples/components/welcome.js";
import { Router, Route, Routes } from "./packages/leaf-router/src/index.js";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/hello" element={<Foo message="Hello world" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
