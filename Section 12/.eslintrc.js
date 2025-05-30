module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    // Disable non-critical rules
    'indent': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    'no-trailing-spaces': 'off',
    'no-multiple-empty-lines': 'off',
    'space-before-function-paren': 'off',
    'space-before-blocks': 'off',
    'keyword-spacing': 'off',
    'comma-spacing': 'off',
    'object-curly-spacing': 'off',
    'array-bracket-spacing': 'off',
    'comma-dangle': 'off',
    'semi': 'off',
    'quotes': 'off',
    // Disable Prettier rules
    'prettier/prettier': 'off',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
  },
};
