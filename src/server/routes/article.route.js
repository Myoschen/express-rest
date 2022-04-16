import express from 'express';
import { validate } from 'express-validation';
import paramValidation from '../../config/param-validation';
import articleController from '../controllers/article.controller';

// 處理 articles 相關路由
const router = express.Router();

// 加入 express-validation 對 Body 內容驗證
router.route('/')
  .get(articleController.articleGet)
  .post(validate(paramValidation.createArticle), articleController.articlePost);

router.route('/:article_id')
  .put(articleController.articlePut)
  .delete(articleController.articleDelete);

export default router;
