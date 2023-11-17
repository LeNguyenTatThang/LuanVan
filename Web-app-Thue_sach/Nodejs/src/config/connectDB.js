
import mysql from 'mysql2/promise';
const MySQLEvents = require('@rodrigogs/mysql-events');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'thuesach',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0

})


export default pool;