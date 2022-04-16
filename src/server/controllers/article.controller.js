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
const articlePut = (req, res) => {
  const id = req.params.article_id; // 取得 URL 後方參數
  const data = req.body; // 取得 Request Body 內容
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
  articlePost, articleGet, articlePut, articleDelete,
};
