module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'eslint:recommended'],
  plugins: ['import', 'promise', 'node'],
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
    },
  },
  rules: {},
};
