const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')


const isDev = process.env.NODE_ENV === 'development'
const prod = !isDev
const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all'
		}
	}
	if (prod) {
		config.minimizer = [
			new OptimizeCssAssetsPlugin(),
			new TerserWebpackPlugin()
		]
	}
	return config
}
console.log('IS DEV:', isDev)

module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.js',
		analytics: './src/analytics.js'
	},
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
		extensions: ['.js', '.json', '.png']
	},
	optimization: optimization(),
	devServer: {
		open: true,
		port: 4200,
		hot: isDev
	},
	devtool: isDev ? 'source-map' : '',
	plugins: [
		new HTMLWebpackPlugin({
			template: './src/index.html',
			minify: {
				collapseWhitespace: prod
			}
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css'
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
						},
					},
					'css-loader'
				]
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
						},
					},
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(png|jpg|svg|gif)$/,
				use: ['file-loader']
			}
		]


	}
}