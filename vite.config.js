import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
	root: 'src',
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	server: {
		host: 'localhost',
		port: 8080,
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				changeOrigin: true,
				secure: false,
				// rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
	build: {
		// Relative to the root
		outDir: '../dist',
	},
});
