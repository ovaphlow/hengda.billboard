module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    camelcase: 0,
    'no-alert': 0,
    'no-underscore-dangle': 0,
    'jsx-a11y/label-has-associated-control': 0,
  },
};
