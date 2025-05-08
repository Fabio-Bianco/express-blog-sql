
// config/db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.getConnection()
  .then(conn => {
    console.log('✅ Connessione al database MySQL riuscita!');
    conn.release();
  })
  .catch(err => {
    console.error('❌ Errore di connessione al database:', err);
  });

module.exports = db;
