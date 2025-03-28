// eslint.config.js
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
    {
        ignores: [
            '**/node_modules/',
            '**/dist/',
            '**/build/',
            '**/.next/',
            '**/*.config.js',
            '**/*.config.cjs',
            '**/public/'
        ]
    },
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ...reactRecommended,
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                },
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: './tsconfig.json'
            }
        },
        plugins: {
            '@typescript-eslint': tseslint,
            'react-hooks': reactHooks,
            'jsx-a11y': jsxA11y
        },
        rules: {
            // Basic rules
            'no-console': 'warn',
            '@typescript-eslint/no-unused-vars': 'warn',

            // React rules
            'react/react-in-jsx-scope': 'off',
            'react/jsx-uses-react': 'off',

            // TypeScript rules
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',

            // Hooks rules
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            // Accessibility rules
            'jsx-a11y/alt-text': 'warn',
            'jsx-a11y/anchor-is-valid': 'warn'
        },
        settings: {
            react: {
                version: 'detect'
            }
        }
    }
];