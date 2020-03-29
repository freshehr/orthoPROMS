module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "commonjs": true
    },
    "extends": [
        "react-app",
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "ignorePatterns": ["node_modules/", "build/", "public/", "ehr-template-processor/", "ehr-template-react-generator/", "react-styled-nhs/"],
    "rules": {
        "react/no-deprecated": "off"
    }
};
