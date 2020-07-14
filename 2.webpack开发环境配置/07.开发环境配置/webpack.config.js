// 开发环境配置
// 能让资源运行即可

// loader：1.下载  2. 使用（配置loader）
// plugin：1.下载  2. 引入  3.使用

const {resolve} = require('path')
const HtmlWebpackConfig = require('html-webpack-plugin')

module.exports = {
    entry: './src/js/index.js',
    output:{
        filename: './js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                // 处理less资源
                test:/\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // 将 less 文件编译成 css 文件
                    'less-loader'
                ]
            },
            {   
                // 处理css资源
                test: /\.css$/,
                use: [
                    // use 数组中 loader 执行顺序：从右到左 从下到上 依次执行
                    // 创建 style 标签，将 js 中的样式资源插入到 head 中生效
                    'style-loader', 
                    // 将 css 文件变成 commonjs 模块 ,加载 js 中，里面内容是样式字符串
                    'css-loader'
                ]
            },
            {
                // 处理图片资源
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    // 图片小于8kb ，就会被 base64 处理
                    // 优点：减少请求数量（减轻服务器压力）
                    // 缺点：图片体积会更大（文件请求速度更慢）
                    limit: 8*1024,
                    // 给图片重命名
                    // [hash:10]取图片的hash的前10位
                    // [ext] 取图片原来的扩展名
                    name: '[hash:7].[ext]',
                    outputPath: 'imgs'
                    // 新版本没有下面的问题了
                    // 问题：因为 url-loader 默认使用 es6 模块化解析，而 html-loader 引入图片是 commonjs
                    // 解析时会出问题：[object Module]
                    // 解决：关闭 url-loader 的 es6 模块化，使用 commonjs 解析
                    // esModule: false
                }
            },
            {
                // 处理html中的img
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                // 处理其他资源
                exclude: /\.(css|js|html|less|png|jpg|gif)/,
                loader: 'file-loader',
                options: {
                    // outputPath: 'media',
                    name: 'media/[hash:10].[ext]',
                }
            }
        ]
    },
    plugins: [
        // plugin 的配置

        // html-webppack-plugin
        // 功能：默认会创建一个空的 html ,自动引入打包输出的所有资源（js/css）
        // 需求：需要有结构的 HTML 文件
        new HtmlWebpackConfig({
            template: './src/index.html'
        })
    ],
    mode: 'development',

    // 开发服务器 devserver :用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
    // 特点：只会在内存中编译打包，不会有任何输出
    // 启动devServer 指令为：npx webpack-dev-server
    devServer: {
        // 项目构建目录
        contentBase: resolve(__dirname, 'build'),
        // 是否开启 gzip 压缩
        compress: true,
        // 端口
        port: 3000,
        // 自动打开浏览器
        open: false
    }

}