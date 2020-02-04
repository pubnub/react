const packageJson = require('./package.json');
const rollupReplace = require('@rollup/plugin-replace');

module.exports = {
  rollup(config) {
    config.plugins.unshift(
      rollupReplace({
        __VERSION__: packageJson.version,
      })
    );
    return config;
  },
};
