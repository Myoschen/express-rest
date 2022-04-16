/* eslint-disable camelcase */
import bcrypt from 'bcryptjs';
import AppError from '../helper/AppError';
import pool from './index.module';

// 新增使用者
const createUser = (data) => new Promise((resolve, reject) => {
  pool.connect((connectError, client, release) => {
    if (connectError) {
      reject(connectError); // 連線失敗
    } else {
      const { user_name, user_mail, user_password } = data;
      const query = {
        text: 'INSERT INTO public."user"(user_name, user_mail, user_password) VALUES ($1, $2, $3)',
        values: [user_name, user_mail, user_password],
      };
      client.query(query, (sqlError, result) => {
        if (sqlError) {
          console.log(`[SQL Error] ${sqlError.message}`);
          reject(sqlError);
        } else if (result.rowCount > 0) {
          resolve('新增使用者成功！');
        } else {
          resolve('新增使用者失敗！');
        }
      });
      release();
    }
  });
});

// 取得所有使用者
const selectUser = () => new Promise((resolve, reject) => {
  pool.connect((connectError, client, release) => {
    if (connectError) {
      reject(connectError);
    } else {
      const query = {
        text: 'SELECT * FROM public."user"',
      };
      client.query(query, (sqlError, result) => {
        if (sqlError) {
          console.log(`[SQL Error] ${sqlError.message}`);
          reject(sqlError);
        } else if (result.rowCount > 0) {
          resolve(result.rows);
        }
      });
      release();
    }
  });
});

// 更新使用者
const updateUser = (id, data) => new Promise((resolve, reject) => {
  pool.connect((connectError, client, release) => {
    if (connectError) {
      reject(connectError);
    } else {
      const { user_name, user_mail, user_password } = data;
      const query = {
        text: 'UPDATE public."user" SET user_name = $1, user_mail = $2, user_password = $3 WHERE user_id = $4',
        values: [user_name, user_mail, user_password, id],
      };
      client.query(query, (sqlError, result) => {
        if (sqlError) {
          console.log(`[SQL Error] ${sqlError}`);
          reject(sqlError);
        } else if (result.rowCount === 0) {
          resolve('請確認使用者 ID!');
        } else {
          resolve('使用者更新成功!');
        }
      });
      release();
    }
  });
});

// 刪除使用者
const deleteUser = (id) => new Promise((resolve, reject) => {
  pool.connect((connectError, client, release) => {
    if (connectError) {
      reject(connectError);
    } else {
      const query = {
        text: 'DELETE FROM public."user" WHERE user_id = $1',
        values: [id],
      };
      client.query(query, (sqlError, result) => {
        if (sqlError) {
          console.log(`[SQL Error] ${sqlError.message}`);
          reject(sqlError);
        } else if (result.rowCount === 0) {
          resolve(`刪除使用者失敗! (user_id: ${id})`);
        } else {
          resolve(`刪除使用者成功! (user_id: ${id})`);
        }
      });
      release();
    }
  });
});

// 取得登入資訊，並驗證密碼是否有誤
const selectUserLogin = (data) => new Promise((resolve, reject) => {
  pool.connect((connectError, client, release) => {
    if (connectError) {
      reject(connectError);
    } else {
      const query = {
        text: 'SELECT * FROM public."user" WHERE user_mail = $1',
        values: [data.user_mail],
      };
      client.query(query, (sqlError, result) => {
        if (sqlError) {
          console.log(`[SQL Error] ${sqlError.message}`);
          reject(sqlError);
        } else if (result.rowCount === 0) {
          reject(new AppError.NotRegisteredMailError());
        } else {
          const passwordFromDatabase = result.rows[0].user_password;
          const passwordFromRequest = data.user_password;
          bcrypt.compare(passwordFromRequest, passwordFromDatabase)
            .then((res) => (res ? resolve('登入成功!') : reject(new AppError.WrongPasswordError())));
        }
      });
      release();
    }
  });
});

export default {
  createUser, selectUser, updateUser, deleteUser, selectUserLogin,
};
