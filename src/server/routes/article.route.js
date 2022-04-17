import express from 'express';
import { validate } from 'express-validation';
import paramValidation from '../../config/param-validation';
import articleController from '../controllers/article.controller';

// 從 Header 中取出 token 並往下傳遞
const ensureToken = (req, res, next) => {
  const header = req.headers.authorization;
  if (typeof header !== 'undefined') {
    const token = header.split(' ')[1];
    req.token = token;
    next();
  } else {
    // 若 Header 中沒有 Token
    res.status(403).send({ code: 403, message: '您尚未登入!' });
  }
};

// 處理 articles 相關路由
const router = express.Router();

// 加入 express-validation 對 Body 內容驗證
router.route('/')
  .get(articleController.articleGet)
  .post(validate(paramValidation.createArticle), articleController.articlePost);

router.route('/:article_id')
  .put(articleController.articlePut)
  .delete(articleController.articleDelete);

router.get('/personal', ensureToken, articleController.articlePersonalGet);

export default router;
