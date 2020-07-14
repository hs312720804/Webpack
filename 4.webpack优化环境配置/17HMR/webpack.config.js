// npx webpack-dev-server 启动 devServer

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
                // require('../18source-map/node_modules/postcss-preset-env')
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
        // 开启 HMR 功能
        // 当修改了 webpack 配置，新配置要想生效，必须重启 webpack 服务
        hot: true,
    }
}