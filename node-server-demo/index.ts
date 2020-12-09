import * as http from 'http';
import {IncomingMessage, ServerResponse} from 'http';
import * as p from 'path';
import * as fs from 'fs';

const server = http.createServer();
// dirname 代表当前路径,主要是处理不同系统的'/'和'\'的问题
const publicDir = p.resolve(__dirname, 'public');
server.on('request', (request: IncomingMessage, response: ServerResponse) => {
  const {method, url, headers} = request;
  switch (url) {
    case '/index.html':
      response.setHeader('Content-Type', 'text/html;charset=utf-8');
      fs.readFile(p.resolve(publicDir, 'index.html'), (error, data) => {
        if (error) throw error;
        response.end(data.toString());
      });
      break;
    case '/style.css':
      response.setHeader('Content-Type', 'text/css;charset=utf-8');
      fs.readFile(p.resolve(publicDir, 'style.css'), (error, data) => {
        if (error) throw error;
        response.end(data.toString());
      });
      break;
    case '/main.js':
      response.setHeader('Content-Type', 'text/javascript;charset=utf-8');
      fs.readFile(p.resolve(publicDir, 'main.js'), (error, data) => {
        if (error) throw error;
        response.end(data.toString());
      });
      break;
  }
});
server.listen(8888);
