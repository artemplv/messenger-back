module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    'no-shadow': 'error',
    'no-underscore-dangle': 1,
    'no-var': 'error',
    'max-params': 'warn',
  },
};
