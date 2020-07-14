
const { resolve } = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");



module.exports = {
    entry: './src/index.js',
    output: {
        // 文件名称 （指定名称+目录）
        filename: 'js/[name].js',
        // 输出文件目录（将来所有资源输出的公用目录）
        path: resolve(__dirname, 'build'),
    },
    module: {
        rules: [
            // loader的配置
            {
                test: /\.css$/,
                // 多个 loader 用 use
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                // 排除 node_modules 下的 js 文件
                exclude: /node_modules/,
                // 只检查 src 下的 js 文件
                include: resolve(__dirname, 'src'),
                // 优先执行
                enforce: 'pre',
                // 延后执行
                // enforce: 'post'
                // 单个 loader 用 loader
                loader: 'eslint-loader'
            },
            {
                // 以下配置只会生效一个
                oneOf: []
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'development'
}