import svelte_parser from 'svelte-eslint-parser';
import js from '@eslint/js';

import prettier from 'eslint-config-prettier';
import prettier_plugin from 'eslint-plugin-prettier';
import simple_import_sort_plugin from 'eslint-plugin-simple-import-sort';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
	js.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		files: ['**/*.{js,ts,svelte}'],
		plugins: {
			prettier: prettier_plugin,
			'simple-import-sort': simple_import_sort_plugin
		},
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.node
			}
		},
		rules: {
			'prettier/prettier': ['error'],
			'no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^$$(Props|Events|Slots|Generic)$'
				}
			],
			'simple-import-sort/imports': [
				'error',
				{
					groups: [
						['^svelte', '^@\\w'],
						['^\\u0000'],
						['^($lib)'],
						['^\\.\\.(?!/?$)', '^\\.\\./?$'],
						['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
						['^.+\\.?(css)$']
					]
				}
			]
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parser: svelte_parser
		}
	},
	{
		ignores: ['build/', '.svelte-kit/', 'dist/']
	}
];
