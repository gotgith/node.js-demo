import * as http from 'http';
import {IncomingMessage, ServerResponse} from 'http';
import * as p from 'path';
import * as fs from 'fs';
import * as url from 'url';

const server = http.createServer();
const cacheAge = 365 * 24 * 60 * 1000;
// dirname 代表当前路径,主要是处理不同系统的'/'和'\'的问题
const publicDir = p.resolve(__dirname, 'public');
server.on('request', (request: IncomingMessage, response: ServerResponse) => {
  const {method, url: path, headers} = request;
  const {pathname, search} = url.parse(path);
  if (method !== 'GET') {
    response.statusCode = 200;
    response.end('这是一个假响应');
    return;
  }
  let filename = pathname.substr(1);
  if (filename === '') {
    filename = 'index.html';
  }
  fs.readFile(p.resolve(publicDir, filename), (error, data) => {
    if (error) {
      console.log(error);
      if (error.errno === -2) {
        response.statusCode = 404;
        fs.readFile(p.resolve(publicDir, '404.html'), (error, data) => {
          response.end(data);
        });
      } else {
        response.statusCode = 500;
        response.end('服务器错误');
      }

    } else {
      // 正确返回
      response.setHeader('Cache-Control', `public,max-age=${cacheAge}`);
      response.end(data);
    }
  });
});
server.listen(8888);
