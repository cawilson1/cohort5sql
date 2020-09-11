require("dotenv").config();

const sql = require("mysql2/promise");

const pool = sql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password
});
