// import add from './add.js'
// import count from './count'

console.log('index.js被加载了~')
import('./add.js').then(({ default: add }) => {
    // console.log(data)
    console.log(add(1, 2))

})
// console.log(count(2,1))