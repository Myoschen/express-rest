import express from 'express';
import config from '../../config/config';

const router = express.Router();

router.get('/', (req, res) => {
  res.send(`此路徑是: localhost:${config.port}/api`);
});

export default router;
