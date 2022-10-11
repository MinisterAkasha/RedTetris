const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: path.join(__dirname, './src/client/index.tsx'),
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build')
	},
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
	            test: /\.(ts|tsx)$/,
				use: 'ts-loader',
				exclude: /node_modules/
            },
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
            },
	        {
		        test: /\.(jpeg|jpg|png|svg)/,
		        loader: 'file-loader'
	        },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
	        template: path.join(__dirname, './src/client/index.html'),
	        filename: './index.html',
        }),
    ],
	devServer: {
		open: true,
		port: 9000,
		hot: true,
	},
};