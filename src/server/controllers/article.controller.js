import articleModule from '../modules/article.module';

// 新增文章
const articlePost = (req, res) => {
  const data = req.body;
  articleModule.createArticle(data)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(`[ERROR] ${error.message}`);
    });
};

// 取得所有文章
const articleGet = (req, res) => {
  articleModule.selectArticle()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(`[ERROR] ${error.message}`);
    });
};

// 更新文章
const articleUpdate = (req, res) => {
  const id = req.params.article_id;
  const data = req.body;
  articleModule.updateArticle(id, data)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(`[ERROR] ${error.message}`);
    });
};

// 刪除文章
const articleDelete = (req, res) => {
  const id = req.params.article_id;
  articleModule.deleteArticle(id)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(`[ERROR] ${error.message}`);
    });
};

export default {
  articlePost, articleGet, articleUpdate, articleDelete,
};
