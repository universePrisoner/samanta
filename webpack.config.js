const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',

	devtool: 'eval-source-map',
	target: 'web',

	entry: path.join(__dirname, './index.tsx'),

	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'pub.bundle.js',
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json'],
		alias: {
			spec: path.resolve(__dirname, 'src/spec'),
		},
	},

	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '/src/templates/index.html'),
		}),
	],
};
