/** @format */

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");
const { urlencoded } = require("body-parser");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root2022",
  database: "cruddatabase",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser, urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM  movie_reviews";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;
  const sqlInsert =
    "INSERT INTO movie_reviews(movieName, movieReview) VALUES (?, ?)";
  db.query(sqlInsert, [movieName, review], (err, result) => {
    console.log(err);
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
