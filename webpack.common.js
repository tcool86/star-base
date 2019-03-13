var path = require('path');
var pathToPhaser = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(pathToPhaser, 'dist/phaser.js');
const CopyPlugin = require('copy-webpack-plugin');
const port = process.env.PORT;

module.exports = {
  entry: './src/boilerplate/game.ts',
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
		{ test: /\.ts$/, loader: 'ts-loader', exclude: '/node_modules/' },
		{ test: /phaser\.js$/, loader: 'expose-loader?Phaser' },
	]
  },
  plugins: [
	new CopyPlugin([
		{ from: './styles/css', to: './styles/css' },
		{ from: './index.html', to: './' },
	]),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      phaser: phaser
    }
  }
};
