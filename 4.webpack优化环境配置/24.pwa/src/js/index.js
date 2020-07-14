import '../css/index.less';

import * as a from './a';

function sum(...args) {
  return args.find((total) => total === 2);
}
console.log(sum(1, 2, 4, 5, 6));

console.log(a.multi(1, 3));

// eslint-disable-next-line
console.log(55555555);

/*
  1. eslint不认识 window、navigator 全局变量
    解决：需要修改 package.json 中 eslintConfig 配置
      "env": {
        "browser": true
      }

  2. sw 代码必须运行在服务器上
      --> nodejs
      -->
       npm i serve -g
       serve -s build
*/
// 注册 ServiceWorker
// 处理兼容性问题
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then(() => {
        console.log('sw注册成功了');
      })
      .catch(() => {
        console.log('sw注册失败了');
      });
  });
}
