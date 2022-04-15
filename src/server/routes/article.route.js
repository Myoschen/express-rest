import express from 'express';
import articleController from '../controllers/article.controller';

const router = express.Router();

router.route('/')
  .get(articleController.articleGet)
  .post(articleController.articlePost);

router.route('/:article_id')
  .put(articleController.articleUpdate)
  .delete(articleController.articleDelete);

export default router;
