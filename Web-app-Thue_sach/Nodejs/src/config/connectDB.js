import mysql from 'mysql2/promise';
require('dotenv').config();
const pool = ({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 60000,
})

var db;

function connectDB() {
  if (!db) {
    db = mysql.createPool(pool);
    db.getConnection(function (err) {
      if (!err) {
        console.log(pool);
        console.log('database connected success !');
      } else {
        console.log("Error database connect !!")
      }
    });
  }
  return db
}

module.exports = connectDB()