/** @format */

import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  //const [movieReviewList, setMovieList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      console.log(response.data);
    });
  }, []);

  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: review,
    }).then(() => {
      alert("successful insert");
    });
  };

  return (
    <div className='App'>
      <h1>CRUD APPLICATION</h1>

      <div ClassName='form'>
        <label>Movie Name:</label>
        <input
          type='text'
          Name='movieName'
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
        />

        <br />
        <br />

        <label>Review</label>
        <input
          type='text'
          Name='review'
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />

        <br />
        <br />

        <button onClick={submitReview}>Submit</button>
      </div>
    </div>
  );
}

export default App;
