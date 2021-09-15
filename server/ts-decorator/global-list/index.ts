import * as express from 'express';
import * as bodyParser from 'body-parser';
// 引入 controllers 内文件，优先完成依赖收集
import './controllers/index';
import './controllers/users';
import register from './register';

export default function () {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // 这里注入依赖
  register('/', app);

  app.listen(8001, () => {
    console.log('server is running at http://localhost:8001');
  });
}
