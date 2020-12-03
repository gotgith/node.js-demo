// __mocks__/fs.js
const fs = jest.createMockFromModule('fs')
const _fs = jest.requireActual('fs')
Object.assign(fs, _fs)

const readMocks = {}

fs.setReadFileMock = (path, error, data) => {
  readMocks[path] = [error, data]
}

fs.readFile = (path, options, callback) => {
  if (callback === undefined) {callback = options}
  if (path in readMocks) {
    callback(...readMocks[path])
  } else {
    _fs.readFile(path, options, callback)
  }
}

module.exports = fs
