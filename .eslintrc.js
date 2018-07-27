module.exports = {
  "extends": [
    "airbnb",
    "prettier",
    "prettier/react"
  ],
  "parser": "babel-eslint",
  "rules": {
    "strict": 0
  },
  "rules": {
    "no-param-reassign": 0,
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [
          ".js",
          ".jsx"
        ]
      }
    ],
    "prettier/prettier": [
      "error",
      {
        "trailingComma": "es5",
        "singleQuote": true,
        "printWidth": 100
      }
    ]
  },
  "plugins": [
    "prettier"
  ],
  "env": {
    "browser": true,
    "node": true
  }, 
  "globals": {
    "document": false
  }
}