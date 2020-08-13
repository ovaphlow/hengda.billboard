module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:prettier/recommended',
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
    'react-hooks',
    'prettier',
  ],
  rules: {
    camelcase: 0,
    'implicit-arrow-linebreak': 0,
    'arrow-body-style': 0,
    'no-trailing-spaces': 0,
    'object-curly-newline': 0,
    'operator-linebreak': 0,
    'prettier/prettier': 'error',
    'no-alert': 0,
    'no-underscore-dangle': 0,
    'consistent-return': 0,
    'jsx-a11y/no-autofocus': 0,
    'no-param-reassign': 0,
    'no-else-return': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-one-expression-per-line': 'off',
  },
};
