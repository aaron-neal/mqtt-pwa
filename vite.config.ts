import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import nodePolyfills from "rollup-plugin-polyfill-node";

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
		  util: "util/",
		}
	  },
	optimizeDeps: {
        esbuildOptions: {
            // Node.js global to browser globalThis
            define: {
                global: 'globalThis'
            },
            // Enable esbuild polyfill plugins
            plugins: [
              NodeGlobalsPolyfillPlugin({
                buffer: true,
                process: true,
              }),
            ],
        }
    },
    build: {
      rollupOptions: {
        // Enable rollup polyfills plugin
        // used during production bundling
        plugins: [nodePolyfills()],
      },
  },
});
