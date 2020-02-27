import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouteMatch, useParams, Link, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, setMovieList }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const history = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };
  const deleteMovie = (id) => {
    axios.delete(`http://localhost:5000/api/movies/${id}`).then((response) => {
      history.push("/");
    });
  };
  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <Link to={`update-movies/${match.params.id}`}>Update Movie</Link>
      <button onClick={() => deleteMovie(match.params.id)}>Delete</button>
    </div>
  );
}

export default Movie;
