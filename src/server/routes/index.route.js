// 主路由
import express from 'express';
import { Pool } from 'pg';
import config from '../../config/config';
import article from './article.route';

const router = express.Router();

router.use('/article', article);

router.get('/', (req, res) => {
  res.send(`此路徑是: localhost:${config.port}/api`);
});

router.get('/sql', (req, res) => {
  const pool = new Pool({
    host: config.postgresHost,
    user: config.postgresUser,
    password: config.postgresPassword,
    database: config.postgresDatabase,
    port: config.postgresPort,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });
  pool.connect((error, client, release) => {
    if (error) {
      res.send(`連線失敗！ (${error.message})`);
    }
    client.query('SELECT NOW()', (err, result) => {
      release();
      if (err) {
        res.send('查詢失敗！');
      }
      res.send(result.rows);
    });
  });
});

export default router;
