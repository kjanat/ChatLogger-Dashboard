import prettierConfig from 'eslint-config-prettier';
import js from '@eslint/js';
import * as tseslint from 'typescript-eslint';

export default [
    {
        ignores: ['dist/*', 'node_modules/*', 'coverage/*', '.eslintrc.cjs']
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{ts,tsx}'],
        plugins: {
            '@typescript-eslint': tseslint.plugin,
        },
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true
                },
            },
        },
        rules: {
            // TypeScript specific rules
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            'no-unused-vars': 'off',
        }
    },
    {
        files: ['**/*.{jsx,tsx}'],
        settings: {
            react: {
                version: 'detect'
            }
        },
        rules: {
            'react/react-in-jsx-scope': 'off',
        }
    },
    prettierConfig
]; 
