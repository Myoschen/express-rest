import { Joi } from 'express-validation';

// Request Body Schema
export default {
  createArticle: {
    body: Joi.object({
      user_id: Joi.number().required(),
      article_title: Joi.string().required(),
      article_tag: Joi.string().required(),
      article_content: Joi.string().min(20).required(),
    }),
  },
  createUser: {
    body: Joi.object({
      user_name: Joi.string().required(),
      user_mail: Joi.string().email().trim().required(),
      user_password: Joi.string().regex(/[a-zA-Z0-9]{6,30}/).required(),
    }),
  },
};
