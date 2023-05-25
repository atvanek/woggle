const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: './client/index.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: './index.html',
			favicon: './client/data/img/blocks.png',
		}),
		new MiniCssExtractPlugin(),
	],
	mode: process.env.NODE_ENV,
	module: {
		rules: [
			{
				test: /\.jsx?/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
					},
				},
			},
			{
				test: /\.s?css/,
				use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
			},
		],
	},
	devServer: {
		static: {
			directory: path.join(__dirname, '/client'),
		},
		compress: true,
		port: 8080,
		proxy: {
			'/api': {
				target: 'http://0.0.0.0:3000',
			},
		},
	},
};
