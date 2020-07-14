
// 解构赋值 获取核心模块 path 中的 resolve 方法
const { resolve } = require('path')

console.log("__dirname==" + __dirname)

module.exports = {
    // webpack 配置
    // 入口起点
    entry: './src/index.js',

    // 输出：
    output: {
        //输出文件名
        filename: 'built.js',
        // 输出路径
        // __dirname nodejs 的变量，代表当前文件的目录绝对路径(当前所属的文件夹)
        path: resolve(__dirname, 'build')
    },

    // loader 的配置
    module: {
        rules: [
            // 详细 loader 的配置
            // 不同文件必须配置不同的 loader 处理
            {
                // 匹配那些文件
                test: /\.css$/,
                // 使用哪些 loader 进行处理
                use: [
                    // use 数组中 loader 执行顺序：从右到左 从下到上 依次执行
                    // 创建 style 标签，将 js 中的样式资源插入到 head 中生效
                    'style-loader',
                    // 将 css 文件变成 commonjs 模块 ,加载 js 中，里面内容是样式字符串
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // 将 less 文件编译成 css 文件
                    'less-loader'
                ]
            }

        ]
    },

    // plugin的配置
    plugins: [
        // 详细 plugins 的配置

    ],

    // 模式
    mode: 'development'  // 开发模式
    // mode: 'production'

}