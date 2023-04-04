const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //pulls css out of bundle.js

module.exports = {
	entry: './client/index.js',
	output: {
		path: path.resolve(__dirname, 'build'), // go back to this, is the right path?
		filename: 'bundle.js',
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: './index.html', //why do we need a template but in the webpack.js.org website, it doesn't use  a template?? IS IT BECAUSE THEY STILL HAVE THEIR BUNDLE JS FILE
		}),
		new MiniCssExtractPlugin(), //adds miniCSS to plugins
	],
	mode: process.env.NODE_ENV,
	module: {
		rules: [
			{
				test: /\.jsx?/, //? means last char is optional
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
				target: 'http://localhost:3000',
			},
		},
	},
};
