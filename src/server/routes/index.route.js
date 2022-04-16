// 主路由
import express from 'express';
import config from '../../config/config';
import article from './article.route';
import user from './user.route';
import pool from '../modules/index.module';

const router = express.Router();

router.use('/articles', article);
router.use('/users', user);

router.get('/', (req, res) => {
  res.send(`此路徑是: localhost:${config.port}/api`);
});

router.get('/sql-current-time', (req, res) => {
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
