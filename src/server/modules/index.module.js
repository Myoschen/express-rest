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

export default pool;
