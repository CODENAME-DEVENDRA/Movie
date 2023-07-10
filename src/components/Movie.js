import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

function Movie() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [movieName, setMovieName] = useState("");
  const [searchedMovies, setSearchedMovies] = useState([]);
  // console.log("aaa", searchedMovies);

  useEffect(() => {
    try {
      axios
        .get(
          "https://api.themoviedb.org/3/movie/popular?api_key=8eb49ca74a05e2bf5cebc0de322cd2d4"
        )
        .then((response) => {
          setPopularMovies(response.data.results);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=8eb49ca74a05e2bf5cebc0de322cd2d4`
        )
        .then((response) => {
          console.log(response);
          setSearchedMovies(response.data.results);
        });
    } catch (error) {
      console.log(error);
    }
  }, [movieName]);

  return (
    <>
      <form
        style={{ display: "flex", justifyContent: "center", margin: "50px" }}
      >
        <input
          type="search"
          value={movieName}
          placeholder="Search Movie"
          onChange={(e) => setMovieName(e.target.value)}
        />
      </form>

      {searchedMovies.length === 0 && movieName === "" ? (
        <>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
            {popularMovies.map((movie) => {
              return <MovieCard movie={movie} />;
            })}
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          {searchedMovies.map((movie) => {
            return <MovieCard movie={movie} />;
          })}
        </div>
      )}
    </>
  );
}

export default Movie;
