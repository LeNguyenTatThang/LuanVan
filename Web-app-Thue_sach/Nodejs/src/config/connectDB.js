import mysql from 'mysql2/promise';
require('dotenv').config();
const poolConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 60000,
}

const pool = mysql.createPool(poolConfig);

pool.getConnection()
  .then((connection) => {
    console.log('Database connected successfully!');
    connection.release();
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
  })

export default pool;