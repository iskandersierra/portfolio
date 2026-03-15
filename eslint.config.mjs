import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import eslintPluginAstro from 'eslint-plugin-astro';
import globals from 'globals';

export default [
	{
		ignores: ['dist/**', '.astro/**', 'node_modules/**', '.netlify/**'],
	},
	{
		...js.configs.recommended,
		files: ['**/*.{js,mjs,jsx,ts,tsx}'],
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
	...eslintPluginAstro.configs.recommended,
	{
		files: ['**/*.astro'],
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
