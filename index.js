require("dotenv").config();
const sql = require("mysql2/promise");
const express = require("express");
const app = express();
const PORT = 4000;

app.use(express.json());

const pool = sql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password
});

app.get("/users", async (request, response) => {
  try {
    console.log("GET ALL USERS");
    const conn = await pool.getConnection();
    const result = await conn.query("SELECT * FROM recipes.user");
    response.status(200).send(result[0]);
    conn.release();
  } catch (error) {
    console.log(error);
    response.status(500).send();
  }
});
//http://localhost:4000/userbyusername?username=asdf%27%20OR%20TRUE%20=%20TRUE--%20
//SELECT * FROM recipes.user WHERE username = 'asdf' OR TRUE = TRUE-- '
app.get("/userbyusername", async (request, response) => {
  try {
    console.log("GET ONE USER");
    const username = request.query.username;
    console.log(`SELECT * FROM recipes.user WHERE username = '${username}'`);
    const conn = await pool.getConnection();
    const result = await conn.query(
      `SELECT * FROM recipes.user WHERE username = ?`,
      [username]
    );
    response.status(200).send(result[0]);
    conn.release();
  } catch (error) {
    console.log(error);
    response.status(500).send();
  }
});

app.post("/user", async (request, response) => {
  try {
    console.log("CREATE USER");
    if (!request.body.username || !request.body.password) {
      return response
        .status(404)
        .send({ message: "missnig username or password" });
    }

    const username = request.body.username;
    const password = request.body.password;
    const age = request.body.age;
    const fname = request.body.fname;
    const lname = request.body.lname;
    const conn = await pool.getConnection();
    const result = conn.query(
      `
        INSERT INTO recipes.user (username,password,age,fname,lname) VALUES (?,?,?,?,?)
    `,
      [username, password, age, fname, lname]
    );

    conn.release();
    response.status(201).send(result);
  } catch (error) {
    console.log(error);
    response.status(500).send();
  }
});

app.put("/user", async (request, response) => {
  try {
    console.log("UPDATE USER");
    if (!request.body.username) {
      return response.status(404).send({ message: "missing username" });
    }
    const username = request.body.username;
    const conn = await pool.getConnection();
    const userResponse = await conn.query(
      `SELECT * FROM recipes.user WHERE username = ?`,
      [username]
    );
    const user = userResponse[0][0];
    console.log(user.password);
    const password = request.body.password
      ? request.body.password
      : user.password;
    const age = request.body.age ? request.body.age : user.age;
    const fname = request.body.fname ? request.body.fname : user.fname;
    const lname = request.body.lname ? request.body.lname : user.lname;

    const result = await conn.query(
      `
            UPDATE recipes.user SET password=?, age=?, fname=?, lname=?
              WHERE username=?
        `,
      [password, age, fname, lname, username]
    );

    conn.release();
    response.status(201).send(result);
  } catch (error) {
    console.log(error);
    response.status(500).send();
  }
});

app.delete("/user", async (request, response) => {
  try {
    console.log("DELETE ONE USER");
    if (!request.body.username) {
      return response.status(404).send({ message: "missing username" });
    }
    const username = request.body.username;

    const conn = await pool.getConnection();
    const result = await conn.query(
      `DELETE FROM recipes.user WHERE username = ?`,
      [username]
    );
    response.status(200).send(result[0]);
    conn.release();
  } catch (error) {
    console.log(error);
    response.status(500).send();
  }
});

app.listen(PORT, () => console.log(`running on ${PORT}`));
