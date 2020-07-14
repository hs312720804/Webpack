# webpack性能优化
* 开发环境性能优化
* 生产环境性能优化

## 开发环境性能优化
* 优化打包构建速度
    * HRM

* 优化代码调试
    * source-map

## 生产环境性能优化
* 优化打包构建速度
    * oneOf
    * babel缓存
    * 多进程打包
    * externals
    * dll （可以和 code split 结合使用，将 node_modules 中需要单独打包的库通过 dll 单独打包，其他的通过 optimization 单独打包）
* 优化代码运行的性能
    * 缓存( hash-chunkhash-contenthash )
    * tree shaking
    * code split
    * 懒加载/预加载
    * PWA
    