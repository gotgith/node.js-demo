const db = require('../db')
// 这个时候引入的是真正的fs
const fs = require('fs')
// 意思为：jest已经接管了fs，所有对fs的操作都会被阻止，但是不会报错。
// 新建__mocks__/fs.js,也就是新的fs,mock一下，模拟fs，对本地不产生影响。
// jest文档位置：Manual Mocks
jest.mock('fs')

describe('db', () => {
  it('can read', async () => {
    const data = [{title: 'hi', done: true}]
    fs.setReadFileMock('/xxx', null, JSON.stringify(data))
    const list = await db.read('/xxx')
    expect(list).toStrictEqual(data) // 测试俩个对象相同使用toStrictEqual，这是因为本质上俩个对象是不同的
  })
  it('can write', () => {

  })
})
