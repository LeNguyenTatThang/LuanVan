import mysql from 'mysql2/promise';
const pool = ({
  host: 'localhost',
  user: 'root',
  database: 'thuesach',
  password: ''
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