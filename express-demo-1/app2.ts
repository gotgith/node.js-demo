import express from 'express';

const app = express();
const port = 4000;

app.post('/', (request, response, next) => {});
app.get('/', (req, res) => {
  res.send('你好!');
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
