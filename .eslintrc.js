module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "prettier",
    "prettier/react",
    "plugin:import/errors",
    "plugin:import/warnings",
    // "plugin:@typescript-eslint/recommended",
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "prettier",
    "react",
    "@typescript-eslint"
  ],
  "rules": {
    "no-unused-vars": "warn",
    "react/prop-types": 0,
    "@typescript-eslint/no-unused-vars": "warn",
    "import/no-named-as-default": 0,
  },
  "settings": {
    "import/resolver": {
      "node": {
        "paths": ["src", "node_modules"],
        "extensions": [".js", ".jsx", ".ts", ".tsx", ".d.ts"],
      }
    },
    "import/ignore": [
      "node_modules/react-native/index\\.js$"
    ]
  }
};
