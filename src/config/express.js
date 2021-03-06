import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ValidationError } from 'express-validation';
import httpStatus from 'http-status';
import config from './config';
import AppError from '../server/helper/AppError';
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
  // res.send(`Server started on port http://127.0.0.1:${config.port} (${config.env})`);
  res.send('<h1 style="text-align: center">Server started with Heroku !</h1> \n <a style="text-align:center; display:block;" href="/api">API HOMEPAGE</a>');
});

app.use('/api', index);

// 驗證 Request Body 內容是否符合指定格式
app.use((err, req, res, next) => {
  let errorMessage;
  let errorCode;
  let errorStatus;
  // express validation error 所有傳入參數驗證錯誤
  if (err instanceof ValidationError) {
    if (err.errors[0].location === 'query' || err.errors[0].location === 'body') {
      errorMessage = err.errors[0].messages;
      errorCode = 400;
      errorStatus = httpStatus.BAD_REQUEST;
    }
    const error = new AppError.APIError(errorMessage, errorStatus, true, errorCode);
    return next(error);
  }
  return next(err);
});

// 回傳自定義的錯誤訊息
app.use((err, req, res, next) => {
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    code: err.code ? err.code : httpStatus[err.status],
    stack: config.env === 'development' ? err.stack : {},
  });
  next();
});

export default app;
