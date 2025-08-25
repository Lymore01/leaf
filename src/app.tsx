import { h } from "./jsx/h.js";
import { seed } from "./core/hooks/hook.js";
import { Foo } from "./examples/components/foo.js";

export const App = () => {
  const [count, setCount] = seed<number>(0);
  return (
    <div
      tw="min-h-screen bg-black text-white flex flex-col justify-center items-center relative z-0 pointer-events-none"
      style={{
        backgroundImage: `
      radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
      radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
        backgroundPosition: "0 0, 20px 20px",
      }}
    >
      <header tw="text-center max-w-2xl space-y-6 px-6 pointer-events-auto">
        <div tw="text-6xl mb-2">🌿</div>

        <Foo message="hello from foo!" />

        <h1 tw="text-green-400 font-extrabold text-2xl sm:text-5xl tracking-tight leading-tight">
          Welcome to Leaf
        </h1>

        <p tw="text-gray-400 text-md sm:text-lg max-w-xl mx-auto leading-relaxed">
          A tiny, snappy JavaScript framework for building reactive UIs.
        </p>

        <p tw="text-gray-400 text-md sm:text-lg max-w-xl mx-auto leading-relaxed">
          Edit{" "}
          <code tw="bg-gray-800 px-1 rounded text-green-400">src/app.tsx</code>{" "}
          file and save to reload.
        </p>

        <div tw="flex justify-center gap-6 mt-8">
          <button
            onClick={() => {
              setCount((prevCount) => prevCount + 1);
            }}
            tw="text-sm cursor-pointer px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-lg shadow-lg hover:from-emerald-600 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-50 transition duration-300 ease-in-out"
          >
            Click: {"  "} {count}
          </button>

          <button
            onClick={() => window.open("https://leafjs.org/docs", "_blank")}
            tw="text-sm cursor-pointer px-8 py-3 bg-gradient-to-r from-green-700 to-green-900 text-green-200 font-semibold rounded-lg shadow-md hover:from-green-800 hover:to-green-950 focus:outline-none focus:ring-4 focus:ring-green-600 focus:ring-opacity-50 transition duration-300 ease-in-out
  "
          >
            API Docs
          </button>
        </div>
      </header>

      <footer tw="pointer-events-auto fixed bottom-4 left-4 text-green-400 text-sm font-medium tracking-wide select-none flex items-center gap-1 font-mono">
        Built with <span tw="text-green-400">❤️</span> by Kelly Limo.
      </footer>
    </div>
  );
};
