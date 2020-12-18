const express = require('express')
const app = express()

// 服务器默认以流的方式处理上传的数据
// express.json()的作用就是发现请求的数据是json，就会把通过监听data事件把这个json解析出来放到body里面
app.use(express.json())
// 发现请求在yyy目录里面，就直接渲染相关文件，负责走下面的逻辑
app.use(express.static('yyy'))

app.use((request, response, next) => {
  console.log('request.body')
  // request.body是一个对象
  console.log(request.body)
  response.send('hi')
  next()
})

app.listen(3000, () => {
  console.log('listen')
})
