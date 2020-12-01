const program = require('commander')

program.option('-x, --xxx', 'what the x')
program
  .command('add')
  .description('add a task')
  .action((...args) => {
    const words = args.slice(0, -1).join(' ')
    console.log(words)
  })
program
  .command('clear')
  .description('clear all task')
  .action(() => {
    console.log('clear')
  })
program.parse(process.argv)

console.log(program.xxx)
