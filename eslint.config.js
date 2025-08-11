import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import perfectionist from 'eslint-plugin-perfectionist';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import path from 'path';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Общие настройки для всех файлов
export default tseslint.config([
	{
		ignores: [
			'*.config.*',
			'**/*.d.ts',
			'dist',
			'node_modules',
			'package*.json',
			'public',
			'storybook-static',
		],
	},
	js.configs.recommended,
	tseslint.configs.recommended,
	tseslint.configs.stylistic,
	importPlugin.flatConfigs.recommended,
	importPlugin.flatConfigs.typescript,
	react.configs.flat.recommended,
	react.configs.flat['jsx-runtime'],
	reactHooks.configs['recommended-latest'],
	{
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			parserOptions: {
				ecmaFeatures: { jsx: true },
			},
			sourceType: 'module',
		},
		plugins: {
			perfectionist,
			react,
			'react-refresh': reactRefresh,
			'unused-imports': unusedImports,
		},
		rules: {
			'import/order': 'off',
			'perfectionist/sort-imports': [
				'error',
				{
					type: 'alphabetical',
					order: 'asc',
					groups: [
						'value-builtin',
						'value-external',
						['value-internal', 'value-parent', 'value-sibling'],
						'type-import',
						'type-internal',
						['type-parent', 'type-sibling', 'type-index'],
						'ts-equals-import',
						'side-effect-style',
						'style',
					],
					internalPattern: [
						'^@components/',
						'^@services/',
						'^@pages/',
						'^@utils/',
					],
					newlinesBetween: 'always',
				},
			],
			'react/jsx-uses-react': 'off',
			'react/prop-types': 'off',
		},
		settings: {
			react: {
				version: 'detect',
			},
			'import/resolver': {
				node: {
					extensions: ['.ts', '.tsx', '.js', '.jsx', '.d.ts'],
				},
				typescript: {
					alwaysTryTypes: true,
					project: './tsconfig.json',
				},
			},
		},
	},
	// Конфигурация для JavaScript файлов (.js, .jsx)
	{
		files: ['**/*.{js,jsx}'],
		rules: {
			'no-unused-vars': 'off',
			'import/no-unresolved': 'error',
			'import/no-unused-modules': 'error',
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
			'unused-imports/no-unused-imports': 'error',
			'unused-imports/no-unused-vars': 'error',
		},
	},
	// Конфигурация для TypeScript файлов (.ts, .tsx)
	{
		files: ['**/*.{ts,tsx}'],
		...tseslint.configs.recommendedTypeCheckedOnly.rules,
		...tseslint.configs.stylisticTypeCheckedOnly.rules,
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				ecmaFeatures: { jsx: true },
				project: './tsconfig.json',
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
				warnOnUnsupportedTypeScriptVersion: false,
			},
		},
		plugins: {
			'@typescript-eslint': tseslint.plugin,
		},
		rules: {
			'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{
					disallowTypeAnnotations: true,
					fixStyle: 'separate-type-imports',
					prefer: 'type-imports',
				},
			],
			'@typescript-eslint/explicit-function-return-type': 'error',
			'@typescript-eslint/explicit-module-boundary-types': 'error',
			'@typescript-eslint/no-inferrable-types': [
				'error',
				{
					ignoreParameters: false,
					ignoreProperties: false,
				},
			],
			'@typescript-eslint/no-import-type-side-effects': 'error',
			'@typescript-eslint/no-unused-expressions': [
				'error',
				{
					allowShortCircuit: true,
					allowTernary: true,
				},
			],
			'@typescript-eslint/no-unused-imports': 'off',
			'unused-imports/no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					args: 'after-used',
					argsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
					vars: 'all',
					varsIgnorePattern: '^_',
				},
			],
		},
		settings: {
			'import/resolver': {
				typescript: {
					project: './tsconfig.json',
				},
			},
		},
	},
	eslintPluginPrettierRecommended,
]);
