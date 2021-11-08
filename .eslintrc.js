module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'airbnb',
      'prettier',
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: ['react', 'eslint-plugin-import-helpers'],
    rules: {
      'no-param-reassign': 0,
      'react/jsx-props-no-spreading': 0,
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: ['**/*.test.js', '**/*.spec.js'],
          optionalDependencies: false,
          peerDependencies: false,
        },
      ],
      'import-helpers/order-imports': [
        'error',
        {
          newlinesBetween: 'always',
          groups: [
            '/^react/',
            ['module', '/^@testing-library/', '/@reduxjs/toolkit/'],
            '/^@.*/',
            ['parent', 'sibling', 'index'],
            '/.scss$/',
          ],
        },
      ],
    },
    settings: {
      'import/resolver': {
        node: {
          paths: ['src'],
        },
        alias: {
          map: [
            [],
        
          ],
        },
      },
    },
  };
  