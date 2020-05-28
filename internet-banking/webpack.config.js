const path = require('path');

module.exports = {
  mode: 'development',

  entry: './src/index.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  devServer: {
    port: 8081,
    writeToDisk: true,
  },
};
