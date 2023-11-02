
import mysql from 'mysql2/promise';


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'thuesach',

})
export default pool;