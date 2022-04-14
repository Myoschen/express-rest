import Joi from 'joi';

// 匯入、設定 dotenv，它會去讀取 .env 檔案內容放入 PROCESS.ENV
require('dotenv').config();

// 建立 joi 驗證規則
const schema = Joi.object().keys({
  NODE_ENV: Joi.string().default('development').allow('development', 'production'),
  PORT: Joi.number().default(8080),
  VERSION: Joi.string(),
  POSTGRES_USER: Joi.string(),
  POSTGRES_HOST: Joi.string().default('localhost'),
  POSTGRES_DATABASE: Joi.string(),
  POSTGRES_PASSWORD: Joi.string(),
  POSTGRES_PORT: Joi.number().default(5432),
}).unknown().required();

// 提取 .env 檔案內容並做驗證
const { error, value: env } = schema.validate(process.env);

// 當驗證失敗時拋出錯誤訊息
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  version: env.VERSION, // 版本
  env: env.NODE_ENV, // 環境
  port: env.PORT, // 阜號
  postgresUser: env.POSTGRES_USER, // 資料庫用戶名稱
  postgresHost: env.POSTGRES_HOST, // 資料庫主機名稱
  postgresDatabase: env.POSTGRES_DATABASE, // 資料庫名稱
  postgresPassword: env.POSTGRES_PASSWORD, // 資料庫密碼
  postgresPort: env.POSTGRES_PORT, // 資料庫阜號
};

export default config;
