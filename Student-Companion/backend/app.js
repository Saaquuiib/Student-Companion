const express = require("express");
const app = express();
const mysql = require("mysql2");
const auth = require("./Routes/auth");
const cors = require("cors"); 

app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

//Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = require("./models");

app.use("/auth", auth);

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
});

connection.query(
  `CREATE DATABASE IF NOT EXISTS student_companion`,
  function (err, results) {
    if (!err) {
      db.sequelize.sync().then(() => {
        app.listen(8000, () => {
          console.log("Connected to 8000");
        });
      });
    } else {
      console.log("KAAM KORENA");
    }
  }
);
