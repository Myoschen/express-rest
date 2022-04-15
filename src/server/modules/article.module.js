/* eslint-disable camelcase */
// 與資料庫溝通的地方
import { Pool } from 'pg';
import config from '../../config/config';

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

// 新增文章
const createArticle = (data) => new Promise((resolve, reject) => {
  pool.connect((connectError, client, release) => {
    if (connectError) {
      reject(connectError); // 連線失敗
    } else {
      const {
        user_id, article_title, article_tag, article_content,
      } = data;
      const query = {
        text: 'INSERT INTO public.article(user_id, article_title, article_tag, article_content) VALUES ($1, $2, $3, $4)',
        values: [user_id, article_title, article_tag, article_content],
      };
      client.query(
        query,
        (sqlError, result) => {
          if (sqlError) {
            console.log(`SQL Error: ${sqlError.message}`);
            reject(sqlError);
          } else if (result.rowCount > 0) {
            resolve(`新增成功！ (article: ${data})`);
          }
          release();
        },
      );
    }
  });
});

// 取得所有文章
const selectArticle = () => new Promise((resolve, reject) => {
  pool.connect((connectError, client, release) => {
    if (connectError) {
      reject(connectError);
    } else {
      const query = {
        text: 'SELECT * FROM public.article',
      };
      client.query(query, (sqlError, result) => {
        if (sqlError) {
          console.log(`SQL error: ${sqlError.message}`);
          reject(sqlError);
        } else if (result.rowCount > 0) {
          resolve(result.rows);
        }
      });
      release();
    }
  });
});

// 更新文章
const updateArticle = (id, data) => new Promise((resolve, reject) => {
  pool.connect((connectError, client, release) => {
    if (connectError) {
      reject(connectError);
    } else {
      const { article_title, article_tag, article_content } = data;
      const query = {
        text: 'UPDATE article SET article_title = $1, article_tag = $2, article_content = $3 WHERE article_id = $4',
        values: [article_title, article_tag, article_content, id],
      };
      client.query(query, (sqlError, result) => {
        if (sqlError) {
          console.log(`SQL Error: ${sqlError}`);
          reject(sqlError);
        } else if (result.rowCount === 0) {
          resolve('請確認文章 ID!');
        } else {
          resolve('文章更新成功!');
        }
      });
      release();
    }
  });
});

// 刪除文章
const deleteArticle = (id) => new Promise((resolve, reject) => {
  pool.connect((connectError, client, release) => {
    if (connectError) {
      reject(connectError);
    } else {
      const query = {
        text: 'DELETE FROM public.article WHERE article_id = $1',
        values: [id],
      };
      client.query(query, (sqlError, result) => {
        if (sqlError) {
          console.log(`SQL Error: ${sqlError.message}`);
          reject(sqlError);
        } else if (result.rowCount === 0) {
          resolve(`刪除失敗! (article_id: ${id})`);
        } else {
          resolve(`刪除成功! (article_id: ${id})`);
        }
      });
      release();
    }
  });
});

export default {
  createArticle, selectArticle, updateArticle, deleteArticle,
};
