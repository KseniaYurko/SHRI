"use strict";

module.exports = {
    root: true,
    parser: require.resolve('@typescript-eslint/parser'),
    root: true,
    extends: [
        "eslint:recommended",
        // "plugin:sort-imports/recommended",
        // "plugin:node/recommended",
        'plugin:@typescript-eslint/recommended',
        'plugin:node/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
    },
    rules: {
        // Настройки правил ESLint
    },
};