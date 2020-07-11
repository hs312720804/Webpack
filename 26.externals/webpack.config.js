
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            //loader 的配置
        ]
    },
    plugins: [

        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'production',
    externals: {
        // 有些包需要 cdn 加载进来
        // 拒绝 jQuery 被打包进来
        jquery: 'jQuery' // 后面是包名，不能写错
    }
}