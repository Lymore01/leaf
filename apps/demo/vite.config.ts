import { defineConfig } from 'vite';
import path from 'path';

console.log(
  'Resolved @runtime path:',
  path.resolve(__dirname, '../../packages/runtime/src/index.ts')
);

export default defineConfig({
  root: '.',
  build: {
    outDir: '../../.leaf',
    rollupOptions: {
      input: 'index.html',
    },
  },
  resolve: {
    alias: {
      '@jsx': path.resolve(__dirname, '../../packages/jsx/src/index.ts'),
      '@router': path.resolve(__dirname, '../../packages/router/src/index.ts'),
      '@core': path.resolve(__dirname, '../../packages/core/src/index.ts'),
      '@runtime': path.resolve(
        __dirname,
        '../../packages/runtime/src/index.ts'
      ),
      '@jsx/jsx-runtime': path.resolve(
        __dirname,
        '../../packages/jsx/src/jsx-runtime.ts'
      ),
      '@leaf/jsx/jsx-dev-runtime': path.resolve(
        __dirname,
        '../../packages/jsx/src/jsx-runtime.ts'
      ),
      '@shared/utils': path.resolve(
        __dirname,
        '../../packages/shared/utils/index.ts'
      ),
      '@shared/types': path.resolve(
        __dirname,
        '../../packages/shared/types/types.ts'
      ),
    },
  },
  server: {
    open: true,
    port: 4000,
  },
});
