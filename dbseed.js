const sql = require("mysql2/promise");

const pool = sql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password
});

// (async function testConnection() {
//   try {
//     const conn = await pool.getConnection();
//     //do a query
//     console.log("connection successful", conn);
//     conn.release();
//   } catch (error) {
//     console.log(error);
//   }
// })();

//create database
// (async function createRecipesDatabase() {
//   try {
//     const conn = await pool.getConnection();

//     conn.query("CREATE DATABASE IF NOT EXISTS recipes");
//     conn.release();
//   } catch (error) {
//     console.log(error);
//   }
// })();

//table for users
// (async function() {
//   try {
//     const conn = await pool.getConnection();
//     conn.query("USE recipes");

//     const userTable = await conn.query(`
//     CREATE TABLE IF NOT EXISTS user (username VARCHAR(255) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, age INT, fname VARCHAR(255), lname VARCHAR(255), PRIMARY KEY(username))
//     `);

//     conn.release();
//   } catch (error) {
//     console.log(error);
//   }
// })();

//create recipe table
// (async function() {
//   try {
//     const conn = await pool.getConnection();
//     conn.query("USE recipes");
//     const recipeTable = await conn.query(`
//       CREATE TABLE IF NOT EXISTS recipe (id INT NOT NULL UNIQUE AUTO_INCREMENT, name VARCHAR(1023) NOT NULL, instructions VARCHAR(1023) NOT NULL, image VARCHAR(8000), DATE VARCHAR(255), user VARCHAR(255) NOT NULL, PRIMARY KEY(id), FOREIGN KEY(user) REFERENCES user(username))      `);
//     console.log(recipeTable);
//     conn.release();
//   } catch (error) {
//     console.log(error);
//   }
// })();
