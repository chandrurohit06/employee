const mysql = require("mysql");

module.exports = mysql.createPool({
  connectionLimit: 100,
  host: process.env.LOCALHOST,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
