const os = require('os');

const mysql = require('mysql2');

const pool = mysql.createPool({
  user: 'ovaphlow',
  password: 'ovaph@HD.1123',
  host: '211.159.150.3',
  port: 3306,
  database: 'hengda-billboard',
  waitForConnections: true,
  connectionLimit: os.cpus().length,
  queueLimit: os.cpus().length,
});

module.exports = pool;
