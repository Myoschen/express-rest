import bcrypt from 'bcryptjs';
import userModule from '../modules/user.module';

// 新增使用者
const userPost = (req, res) => {
  const data = {
    ...req.body,
    user_password: bcrypt.hashSync(req.body.user_password, 10), // 將密碼加密
  };
  userModule.createUser(data)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(`[ERROR] ${error.message}`);
    });
};

// 取得所有使用者
const userGet = (req, res) => {
  userModule.selectUser()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(`[ERROR] ${error.message}`);
    });
};

// 更新使用者
const userPut = (req, res) => {
  const id = req.params.user_id;
  const data = req.body;
  userModule.updateUser(id, data)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(`[ERROR] ${error.message}`);
    });
};

// 刪除使用者
const userDelete = (req, res) => {
  const id = req.params.user_id;
  userModule.deleteUser(id)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(`[ERROR] ${error.message}`);
    });
};

const userLogin = (req, res, next) => {
  const data = req.body;
  userModule.selectUserLogin(data)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      // res.send(`[ERROR] ${error.message}`);
      next(error);
    });
};

export default {
  userPost, userGet, userPut, userDelete, userLogin,
};
