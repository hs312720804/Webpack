
const {resolve} = require('path')

const HtmlWebpackConfig = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            // {
            //     test: /\.(png|jpg|svg)$/,
            //     loader: 'url-loader'
            // },
            {
                exclude: /\.(css|js|html|png|jpg)$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins:[
        new HtmlWebpackConfig({
            template: './src/index.html' 
        })
    ],
    mode: 'development'
}