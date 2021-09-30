module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true
  },
  extends: [],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'no-use-before-define': ['off', { functions: false }],
    'comma-dangle': ['error', {
      'arrays': 'never',
      'objects': 'never',
      'imports': 'never',
      'exports': 'never',
      'functions': 'never'
    }],
    'space-before-function-paren': ['error', 'always'],
    'template-curly-spacing': ['error', 'always'],
    'curly': ['error', 'all'],
    'nonblock-statement-body-position': ['error', 'below'],
    'brace-style': ['error', '1tbs'],
    'no-param-reassign': ['off'],
    'no-plusplus': 0,
    'no-multi-spaces': [
      'error',
      {
        exceptions: {
          VariableDeclarator: true,
          ImportDeclaration: true
        }
      }
    ],
    'quotes': ['error', 'single'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'computed-property-spacing': ['error', 'always'],
    'prefer-const': ['error'],
    'semi': [2, 'always'],
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'no-undef': ['error'],
    'no-const-assign': ['error'],
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
    'no-trailing-spaces': ['error']
  }
};
