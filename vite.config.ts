import { defineConfig } from 'vite';
import viteReact from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [viteReact(), TanStackRouterVite()],
	server: {
		port: 5001,
	},
});
