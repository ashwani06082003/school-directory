import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // keep empty if you didn’t set any MySQL password in XAMPP
  database: 'school_db',
});
