/*
    服务器代码
    启动服务器指令：
        1.  npm i nodemon -g
            nodemon server.js

        2.  node server.js
        
    访问服务器地址

*/

const express = require('express')

const app = express()

app.use(express.static('build', { maxAge: 1000 * 3600}))

app.listen(3000, () => {console.log('listening on 3000...')})