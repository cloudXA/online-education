module.exports = {
    root: true,
    parserOptions: {
      "parser": "babel-eslint",
      sourceType: 'module',
      allowImportExportEverywhere: true
    },
    env: {
        browser: true,
        node: true,
        es6: true,
      },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: ['plugin:vue/recommended','eslint:recommended'],
    // required to lint *.vue files
    plugins: [
      'html'
    ],
    "ecmaFeatures": {
      "modules": true
    },
    // add your custom rules here
    rules: {
      'generator-star-spacing': 0,
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
      'semi':['error','always'],
      'indent':0,
      'space-before-function-paren': 0,
      'eslint linebreak-style': ["off", "windows"]
    }
  }