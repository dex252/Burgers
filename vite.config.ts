import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import readableClassnames from 'vite-plugin-readable-classnames';
import checker from 'vite-plugin-checker';
import sassDts from 'vite-plugin-sass-dts';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		// checker({
		//   typescript: true,
		// }),
		react(),
		readableClassnames(),
		sassDts({
			enabledMode: ['development'],
			esmExport: true,
		}),
	],
	base: '',
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@components': path.resolve(__dirname, './src/components'),
			'@services': path.resolve(__dirname, './src/utils'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@utils': path.resolve(__dirname, './src/utils'),
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./vitest-setup.js'],
	},
	server: {
		open: true,
	},
});
