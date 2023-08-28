const config = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  settings: {
    react: {
      version: 'detect', // 自動的にReactのバージョンを検出する
    },
  },
  extends: [
    'react-app',
    'react-app/jest',
    'plugin:react/recommended',
    'standard',
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'plugin:cypress/recommended',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', 'jest', 'import', 'cypress'],
  rules: {
    'react/jsx-uses-react': 'off', // ReactのJSX変換時にReactのインポートが不要にする
    'react/react-in-jsx-scope': 'off', // JSXを使用する際にReactのスコープ内であることを要求しない
    'prettier/prettier': 'error', // Prettierのフォーマットルールに違反した場合にエラーを出力する
    'jest/consistent-test-it': ['error', { fn: 'it' }], // Jestでのテスト関数名を一貫性を持って'it'とする
    'jest/require-top-level-describe': ['error'], // Jestのテストケースをトップレベルのdescribeブロック内に要求する
    'import/order': [
      // インポートの順序を指定したルールに従って整理する
      'error',
      {
        'newlines-between': 'always', // インポートのグループの間には常に新しい行を挿入する
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'], // インポートの順序を定義するグループ
        alphabetize: { order: 'asc', caseInsensitive: true }, // インポートをアルファベット順（大文字・小文字を区別しない）にする
      },
    ],
  },
}

module.exports = config
