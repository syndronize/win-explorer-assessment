// eslint.config.cjs
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsparser = require('@typescript-eslint/parser');
const reactRecommended = require('eslint-plugin-react/configs/recommended');
const reactHooks = require('eslint-plugin-react-hooks');
const jsxA11y = require('eslint-plugin-jsx-a11y');

module.exports = [
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
];