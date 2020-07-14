
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 设置nodejs环境变量
process.env.NODE_env = 'production'

module.exports = {
    entry:'./src/js/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module:{
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 'style-loader',
                    // 这个loader取代style-loader。提取js中的css成单独文件 
                    MiniCssExtractPlugin.loader, 
                    'css-loader',

                    // css兼容性处理: postcss --> postcss-loader postcss-preset-env
                    // 修改loader的默认配置
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                // postcss 的插件
                                // 帮 postcss 找到 package.json 中的 browserslist 里面的配置，通过配置加载指定的 css 兼容性样式。
                                // "browserslist": {
                                //     开发环境
                                //     "development": [
                                //       "last 1 chrome version",
                                //       "last 1 firefox version",
                                //       "last 1 safari version"
                                //     ],
                                //     生产环境（默认找生产环境）
                                //     "production": [
                                //       ">0.2%",
                                //       "not dead",
                                //       "not op_mini all"
                                //     ]
                                // }
                                require('postcss-preset-env')
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // 将css提取成单独文件
        new MiniCssExtractPlugin({
            filename: './css/build.css'
        })
    ],
    mode: 'development'
}