
/*
    HMR: hot module replacement 热模块替换/模块热替换
        作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块）
            极大提升构建速度

            样式文件：可以使用HMR功能：因为style-loader内部实现了

            js文件：默认不能使用HRM功能 ---> 需要修改js代码，添加支持HMR功能的代码
                注意：HMR功能对JS的处理，只能处理非入口js文件的其他文件。
                
            html文件：默认不能使用HRM功能，同时会导致问题：HTML不能热更新了（不用做HMR功能）
                解决：修改entry入口，将html文件引入
*/

const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 定义nodejs环境变量：决定使用browserslist的那个环境
process.env.NODE_ENV = 'development'

// 复用loader
const commonCssLoader = [
    'style-loader',
    // MiniCssExtractPlugin.loader,
    // {
    //     loader: MiniCssExtractPlugin.loader,
    //     options: {
    //         // 解决css文件中的url路径问题
    //         publicPath: '../'
    //     }
    // },
    'css-loader',
    {
        // 还需要在package.json中定义browserslist
        // 指定兼容哪些版本的浏览器
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: () =>{
                require('postcss-preset-env')
                // require('../20缓存/node_modules/postcss-preset-env')
            }
        }

    }
];

module.exports = {
    entry: ['./src/js/index.js', './src/index.html'],
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build'),
        
    },
    module: {
        rules: [
            {
                // js语法检查
                // 在 package.json 中 eslintConfig --> airbnb
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                // 优先处理 先执行 eslint 在执行 babel
                enforce: 'pre',
                options: {
                    fix: true
                }
            },
            {
                // 以下 loader 只会匹配一个
                // 注意：不能有两个配置处理同一类型的文件
                oneOf:[
                    {
                        // 处理样式文件
                        test:/\.css$/,
                        use: [...commonCssLoader]
                            
                    },
                    {
                        // 处理less样式文件
                        test:/\.less$/,
                        use: [...commonCssLoader,'less-loader']
                    },
                    /*
                        正常来讲，一个文件只能被一个loader处理.
                        当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
                            先执行 eslint 在执行 babel
                    */
                    
                    {
                        // js兼容性处理
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                        options: {
                            // 预设：指示babel做怎么样的兼容性处理
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        // 按需加载
                                        useBuiltIns: 'usage',
                                        // 指定core-js版本
                                        corejs: {version: 3},
                                        // 指定兼容性做到哪个版本浏览器
                                        targets: {
                                            chrome: '60',
                                            firefox: '60',
                                            safari: '10',
                                            ie: '9',
                                            edge: '11'
                                        }
                                    }
                                ],
        
                            ]
                        }
                    },
                    
                    {
                        // 处理图片资源
                        test: /\.(jpg|png|gif)$/,
                        loader: 'url-loader',
                        options: {
                            limit: 8*1024,
                            outputPath:'imgs',
                            name: '[hash:7].[ext]'
                        }
                    },
                    {
                        // 处理html中的图片资源
                        test: /\.html$/,
                        loader: 'html-loader'
                    },
                    {
                        // 处理其他资源
                        exclude: /\.(js|html|css|less|jpg|png|gif)/,
                        // 原封不动输出文件
                        loader: 'file-loader',
                        options: {
                            name: 'media/[hash:7].[ext]'
                        }
                    }
                ]
            },
            

        ]
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
    mode: 'development',

    // 开发服务器 devserver :用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
    // 特点：只会在内存中编译打包，不会有任何输出
    // 启动devServer 指令为：npx webpack-dev-server
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        open: false,
        port: 3000,
        hot: true,
    },
    devtool: 'eval-source-map'

    /*
        source-map: 一种 提供源代码到构建后代码映射 技术 （如果构建后代码出错了，通过映射可以追踪到源代码错误）

        [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map

        source-map：外部
            错误代码准确信息 和 源代码的错误位置
        inline-source-map：内联
            只生成一个内联 source-map
            错误代码准确信息 和 源代码的错误位置
        hidden-source-map：外部
            错误代码错误原因，但是没有错误位置
            不能追踪源代码错误，只能提示到构建后代码的错误位置
        eval-source-map：内联
            每一个文件都生成对应的 source-map，都在eval
            错误代码准确信息 和 源代码的错误位置
        nosources-source-map: 外部
            错误代码准确信息，但是没有任何源代码信息
        cheap-source-map：外部
            错误代码准确信息 和 源代码的错误位置
            只能精确到行
        cheap-module-source-map：外部
            错误代码准确信息 和 源代码的错误位置
            module 会将 loader 的 source map 加入

        内联 和外部的区别：1.外部生成了文件，内联没有 2.内联构建速度更快

        开发环境：速度快，调试更友好
            速度快（ eval > inline > cheap > ... ）
                eval-cheap-source-map
                eval-source-map
            调试更友好
                source-map
                cheap-module-source-map
                cheap-source-map

            --> eval-source-map  /  eval-cheap-module-source-map
        
        生产环境：源代码要不要隐藏？调试要不要更友好
            内联会让代码体积变大，所以在生产环境不用内联
            nosources-source-map 全部隐藏
            hidden-source-map 只隐藏源代码，会提示构建后代码错误信息

            --> source-map  /  cheap-module-source-map
    */
}