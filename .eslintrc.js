module.exports = {
  env: {
    node: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    'no-shadow': 'error',
    'no-underscore-dangle': 1,
    'no-var': 'error',
    'max-params': 'warn',
  },
};
