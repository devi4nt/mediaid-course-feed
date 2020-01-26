const path = require('path');

module.exports = {
    extends: '@holograph/eslint-config-holo',
    parserOptions: {
        project: path.resolve(__dirname, './tsconfig.json'),
        tsconfigRootDir: __dirname,
      },
};
