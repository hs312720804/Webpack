
const { resolve } = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

/*
    entry: 入口起点
        1. string   --> './src/index.js'
            打包形成一个 chunk。输出一个 bundle 文件
            此时 chunk 的名称默认是 main
        2. array
            多入口  --> ['./src/index.js', './src/add.js']
            所有入口文件最终只会形成一个 chunk，输出出去只有一个 bundle 文件
                --> 只有在HRM功能中让 html 热更新生效~
        3. object
            多入口
            有几个入口文件就形成几个 chunk，输出几个 bundle 文件
            此时 chunk 的名称是 key

            --> 特殊用法
                {
                    // 所有入口文件最终只会形成一个 chunk，输出出去只有一个 bundle 文件.
                    index: ['./src/index.js', './src/count.js'],
                    // 形成一个 chunk ,输出一个 bundle
                    add: './src/add.js'
                }

*/

module.exports = {
    entry: {
        index: ['./src/index.js', './src/count.js'],
        add: './src/add.js'
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'build')
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'development'
}