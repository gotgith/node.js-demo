import * as http from 'http';
import {IncomingMessage, ServerResponse} from 'http';

const server = http.createServer();
server.on('request', (request: IncomingMessage, response: ServerResponse) => {
  console.log(request.method);
  console.log(request.url);
  console.log(request.headers);
  const array = [];
  // 接收数据，因为数据传输有大小限制，分成多个包上传，因此需要用数组接收
  request.on('data', (chunk) => {
    array.push(chunk);
  });
  // 数据接收完成，把数据进行拼接
  request.on('end', () => {
    const body = Buffer.concat(array).toString();
    console.log('body');
    console.log(body);
    response.end('hi');
  });
});
server.listen(8888);
