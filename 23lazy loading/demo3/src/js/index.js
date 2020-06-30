
// import {add} from './test.js'
// import $ from 'jquery'
console.log('index.js 文件被加载了~')
function sum(...args) {
  return args.reduce((total, current) => total + current, 0);
}


/*
  通过 js 代码，让某个文件被单独打包成一个 chunk
  import 动态导入语法：能将某个文件单独打包
*/

document.getElementById('btn').onclick = function() {
  // 懒加载 import() 当文件需要使用时才加载
  // 预加载 prefetch webpackPrefetch: true 会在使用之前，提前加载 js 文件
  // 正常加载可以认为是并行加载（同一时间加载多个文件）  
  // 预加载 prefetch: 等其他资源加载完毕，浏览器空闲了，在偷偷加载资源 （在IE或手机端有兼容问题，慎用）
  import(/* webpackChunkName: 'hahha', webpackPrefetch: true*/'./test.js')
    .then(({add}, err) => {
      // 文件加载成功~
      console.log(add(1,2))
    })
    .catch((err) => {
      // 文件加载失败
    })
}

// eslint-disable-next-line
// console.log('add result-->' + add(2,6))

// eslint-disable-next-line
console.log('reduce sum-->' + sum(1, 2, 4, 5, 6));

// eslint-disable-next-line
// console.log($);
