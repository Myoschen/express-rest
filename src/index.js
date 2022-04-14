import config from './config/config';
import app from './config/express';

if (require.main) {
  app.listen(config.port, () => {
    console.log(`Server started on port http://127.0.0.1:${config.port} (${config.env})`);
  });
}
