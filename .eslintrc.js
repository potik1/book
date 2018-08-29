module.exports = {
  'env': {
    'es6': true,
    'jest': true,
    'node': true,
    'browser': true
  },
  'parser': 'babel-eslint',
  'parserOptions': {
    ecmaVersion: 7,
    sourceType: 'module'
  },
  'plugins': ['import'],
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  'rules':{
    'no-console': 0,
    'func-names': ['error', 'never'],
    "import/no-extraneous-dependencies": [2, { "devDependencies": true }],
  }
};
