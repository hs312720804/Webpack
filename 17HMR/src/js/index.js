// 引入icon font样式文件
import '../css/iconfont.css';

import '../css/index.less';

import print from './print';

// eslint-disable-next-line
console.log('页面重新加载了~~');

if (module.hot) {
  // module.hot 为true，说明开启了HMR功能 ---> 让HMR功能代码生效
  module.hot.accept('./print.js', () => {
    // 方法会监听 print.js 文件的变化，一旦发生变化，其他默认不会重新打包构建
    // 会执行后面的回调函数
    print();
  });
}
