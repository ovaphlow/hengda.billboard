const mysql = require('mysql2');

const config = require('./config')

const pool = mysql.createPool({
  user: config.mysql.username,
  password: config.mysql.password,
  host: config.mysql.host,
  port: config.mysql.port,
  database: config.mysql.database,
  waitForConnections: true,
  connectionLimit: config.mysql.pool.size,
  queueLimit: 0
})

module.exports = pool