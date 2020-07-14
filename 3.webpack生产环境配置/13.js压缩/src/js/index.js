const add = (a, y) => a + y;
// 下一行代码eslint 所有规则都失效（下一行不进行检查）
// eslint-disable-next-line
console.log(add(1,3))