const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
          
            {
                test: /\.(png|jpg|gif)$/,
                // 使用一个loader
                // 处理图片资源 url-loader file-loader
                loader: 'url-loader',
                options: {
                    // 图片小于8kb ，就会被 base64 处理
                    // 优点：减少请求数量（减轻服务器压力）
                    // 缺点：图片体积会更大（文件请求速度更慢）
                    limit: 13 * 1024,
                    // 给图片重命名
                    // [hash:10]取图片的hash的前10位
                    // [ext] 取图片原来的扩展名
                    name: '[hash:10].[ext]'

                    // 新版本没有下面的问题了
                    // 问题：因为 url-loader 默认使用 es6 模块化解析，而 html-loader 引入图片是 commonjs
                    // 解析时会出问题：[object Module]
                    // 解决：关闭 url-loader 的 es6 模块化，使用 commonjs 解析
                    // esModule: false
                }
            },
            {
                test: /\.html$/,
                // 处理 html 文件的 img 图片（负责引入 img , 从而能被 url-loader 进行处理）
                loader: 'html-loader',
                
            }

        ],
    },
    plugins: [
        // plugin 的配置
        // html-webppack-plugin
        // 功能：默认会创建一个空的 html ,自动引入打包输出的所有资源（js/css）
        // 需求：需要有结构的 HTML 文件
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // 告诉 webpack 哪些库不参与打包，同时使用时的名称也得变~
        new webpack.DllReferencePlugin({
            manifest: resolve(__dirname, 'dll/manifest.json')
        }),
        // 将某个文件打包输出去，并在html中自动引入该资源（负责把资源引进来）
        new AddAssetHtmlWebpackPlugin({
            filepath: resolve(__dirname, 'dll/jquery.js')
        })
    ],
 
    mode: 'production'
}