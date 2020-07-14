
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename:'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules:[
           
            {
                /*
                 语法检查： eslint-loader eslint
                 注意： 只检查自己写的源代码，第三方库是不用检查的
                 设置检查规则：
                    package.json中eslintConfig 中设置~
                    "eslintConfig": {
                        "extends": "airbnb-base"
                    }
                    airbnb --> eslint-config-airbnb-base eslint-plugin-import eslint
                */
                test:/\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    // 自动修复eslint的错误
                    fix: true,
                    // 编译前检查
                    enforce: 'pre',
                }
            }
             
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        

    ],
    mode: 'development'
}