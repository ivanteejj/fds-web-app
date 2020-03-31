
const Pool = require('pg').Pool
const pool = new Pool({
  user: '2102-web-admin',
  host: 'localhost',
  database: '2102-fds-web-app',
  password: '2102-web-password',
  port: 5432,
})

module.exports = pool;