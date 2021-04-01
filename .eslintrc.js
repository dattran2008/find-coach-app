module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', '@vue/airbnb'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-var': 'error',
    eqeqeq: ['error', 'smart'],
    camelcase: ['error', { properties: 'always' }],
    'operator-linebreak': ['error', 'after'],
    'max-len': ['error', { code: 200 }],
  },
};
