import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import eslintPluginAstro from 'eslint-plugin-astro';
import globals from 'globals';

const JS_FILES = ['src/**/*.{js,mjs,jsx}', '.github/**/*.mjs', '*.mjs'];
const TS_FILES = ['src/**/*.{ts,tsx}'];
const ASTRO_FILES = ['src/**/*.astro'];

export default [
	{
		ignores: [
			'dist/**',
			'.astro/**',
			'.agents/**',
			'.claude/**',
			'node_modules/**',
			'.netlify/**',
		],
	},
	{
		...js.configs.recommended,
		files: JS_FILES,
		languageOptions: {
			...js.configs.recommended.languageOptions,
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},
	{
		files: TS_FILES,
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parser: tsParser,
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},
	...eslintPluginAstro.configs.recommended,
	{
		files: ASTRO_FILES,
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
			parserOptions: {
				parser: tsParser,
				extraFileExtensions: ['.astro'],
			},
		},
	},
];
