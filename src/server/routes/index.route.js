// 主路由
import express from 'express';
// import config from '../../config/config';
import article from './article.route';
import user from './user.route';
import pool from '../modules/index.module';

const router = express.Router();

// 加入 users 及 articles 路由
router.use('/articles', article);
router.use('/users', user);

// api 主路由
router.get('/', (req, res) => {
  // res.send(`此路徑是: localhost:${config.port}/api`);
  res.send('<h1 style="text-align:center">Welcome to express-rest api !</h1> \n <p style="text-align:center">You can go to the github repository for more information.</p>');
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
