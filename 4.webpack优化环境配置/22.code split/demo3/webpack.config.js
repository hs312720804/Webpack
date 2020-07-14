
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // 单入口
    // entry: './src/js/index.js',
    entry: {
        // 多入口: 有一个入口，最终输出就有一个 bundle
        main: './src/js/index.js',
        // test: './src/js/test.js'
    },
    output: {
        // [name]: 取文件名
        filename: 'js/[name].[contenthash:10].js',
        path: resolve(__dirname, 'build'),
        
    },
    
    plugins: [
        // 处理HTML
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            minify: {
                // 移除空格
                collapseWhitespace: true,
                // 移除注释
                removeComments: true
            }
        }),
      
    ],
    /*
        1.可以将 node_modules 中的代码单独打包一个 chunk 最终输出
        2.自动分析多入口 chunk 中，有没有公共的文件。如果有会打包成单独的一个 chunk
    */
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        
    },
    mode: 'production',
  
}