// import {add} from './a.js'


function sum(...args) {
  return args.reduce((total, current) => total + current, 0);
}

// eslint-disable-next-line
// console.log('add result-->' + add(2,6))

// eslint-disable-next-line
console.log('reduce sum-->' + sum(1, 2, 4, 5, 6));

// eslint-disable-next-line
console.log(55555555);
