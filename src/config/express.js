import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config';
import index from '../server/routes/index.route';

const app = express();

// HTTP request logger
// 當存取某個 API 就會在 Terminal 顯示 Status code (e.g. 200, 404, etc...)
app.use(morgan('dev'));

// 跨來源資源共享 CORS
// 也可在每個路由的 header 加入 Access-Control-Allow-Origin、Access-Control-Allow-Headers
app.use(cors());

// 解析 JSON, Raw, text, XML, URL encoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`Server started on port http://127.0.0.1:${config.port} (${config.env})`);
});

app.use('/api', index);

export default app;
