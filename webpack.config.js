let StatsPlugin = require('stats-webpack-plugin');

let config = {
  module: {
    loaders: [
      { test: /\.json/, loader: 'json' },
      { test: /\.js$/, exclude: /(node_modules|bower_components)/, loader: 'babel' }
    ],
  },
  output: {
    filename: 'pubnub-react.js',
    library: 'PubNubReact',
    libraryTarget: 'umd',
  },
  plugins: [
    new StatsPlugin('stats.json', {
      chunkModules: true,
      exclude: ['node_modules']
    })
  ],
  externals: [],
  profile: true
};

module.exports = config;
