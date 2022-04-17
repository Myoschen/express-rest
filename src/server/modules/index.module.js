import { Pool } from 'pg';
// import config from '../../config/config';

// const pool = new Pool({
//   host: config.postgresHost,
//   user: config.postgresUser,
//   password: config.postgresPassword,
//   database: config.postgresDatabase,
//   port: config.postgresPort,
//   max: 20,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
// });

const pool = new Pool({
  connectionString: 'postgres://sidrifgioiucsp:c38c74c218e100ac30e894250785c17e1322fb0a7203025b8ba46c35e2af5fea@ec2-52-54-212-232.compute-1.amazonaws.com:5432/dcccsah1l84ci',
  ssl: {
    rejectUnauthorized: false,
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export default pool;
