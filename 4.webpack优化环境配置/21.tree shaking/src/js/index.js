import '../css/index.less';

import * as a from './a.js';

function sum(...args) {
  return args.find((total, current) => total === 2);
}
console.log(sum(1, 2, 4, 5, 6));

console.log(a.multi(1, 3))

// eslint-disable-next-line
console.log(55555555);
