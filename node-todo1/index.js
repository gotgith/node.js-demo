const db = require('./db.js')
const inquirer = require('inquirer')

module.exports.add = async (title) => {
  // 1.读取之前的任务
  const list = await db.read()
  // 2.往文件里添加一个title任务
  list.push({title, done: false})
  // 3.存储任务到文件
  await db.write(list)
}

module.exports.clear = async (title) => {
  await db.write([])
}

module.exports.showAll = async () => {
  // 读取之前的任务
  const list = await db.read()
  // 打印之前的任务
  inquirer.prompt({
    type: 'list',
    name: 'index',
    message: '请选择你想操作的任务',
    choices: [{name: '退出', value: '-1'}, ...list.map((task, index) => {
      return {name: `${task.done ? '[x]' : '[_]'} ${index + 1} - ${task.title}`, value: index.toString()}
    }), {name: '+ 创建任务', value: '-2'}]
  }).then(answer => {
    console.log(answer.index)
  })
}
