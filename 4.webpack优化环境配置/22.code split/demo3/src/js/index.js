
// import {add} from './test.js'
// import $ from 'jquery'

function sum(...args) {
  return args.reduce((total, current) => total + current, 0);
}


/*
  通过 js 代码，让某个文件被单独打包成一个 chunk
  import 动态导入语法：能将某个文件单独打包
*/
import(/* webpackChunkName: 'hahha' */'./test.js')
  .then((data, err) => {
    // 文件加载成功~
    console.log(data)
  })
  .catch((err) => {
    // 文件加载失败
  })
// eslint-disable-next-line
// console.log('add result-->' + add(2,6))

// eslint-disable-next-line
console.log('reduce sum-->' + sum(1, 2, 4, 5, 6));

// eslint-disable-next-line
// console.log($);
