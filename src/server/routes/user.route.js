import express from 'express';
import { validate } from 'express-validation';
import paramValidation from '../../config/param-validation';
import userController from '../controllers/user.controller';

// 處理 users 相關路由
const router = express.Router();

// 加入 express-validation 對 Body 內容驗證
router.route('/')
  .get(userController.userGet)
  .post(validate(paramValidation.createUser), userController.userPost);

router.route('/:user_id')
  .put(userController.userPut)
  .delete(userController.userDelete);

router.route('/login')
  .post(userController.userLogin);

export default router;
