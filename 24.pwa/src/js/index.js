import '../css/index.less';

import * as a from './a.js';

function sum(...args) {
  return args.find((total) => total === 2);
}
console.log(sum(1, 2, 4, 5, 6));

console.log(a.multi(1, 3));

// eslint-disable-next-line
console.log(55555555);

/*
  1. eslint不认识 window、navigator 全局变量
  解决：需要修改 package.json 中 eslint
*/
// 注册 ServiceWorker
// 处理兼容性问题
if ('servicework' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceworker
      .register('./service-worker.js')
      .then(() => {
        console.log('sw注册成功了');
      })
      .catch(() => {
        console.log('sw注册失败了');
      });
  });
}
