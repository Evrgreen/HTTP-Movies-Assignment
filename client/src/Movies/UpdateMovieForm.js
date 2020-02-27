import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const UpdateMovieForm = ({ setMovieList }) => {
  const [finalItem, setFinalItem] = useState();
  const [item, setItem] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: ""
  });

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        setItem(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const onSubmit = (event, values) => {
    event.preventDefault();
    if (typeof values.stars === "string") {
      const starArr = values.stars.split(",");
      setFinalItem({ ...values, ["stars"]: starArr });
    } else {
      setFinalItem(values);
    }
  };

  useEffect(() => {
    const updateMovie = async () => {
      if (!(typeof finalItem === "undefined")) {
        const data = await axios.put(
          `http://localhost:5000/api/movies/${id}`,
          finalItem
        );

        history.push(`/movies/${id}`);
      } else {
      }
    };
    updateMovie();
  }, [finalItem]);

  const handleChange = (event) => {
    setItem({ ...item, [event.target.name]: event.target.value });
  };

  return (
    <>
      <form onSubmit={(event) => onSubmit(event, item)}>
        <label htmlFor="title">
          Title
          <input
            type="text"
            className="title"
            id="title"
            value={item.title}
            onChange={handleChange}
            name="title"
          />
        </label>
        <label htmlFor="director">
          Director
          <input
            type="text"
            className="director"
            id="director"
            value={item.director}
            onChange={handleChange}
            name="director"
          />
        </label>
        <label htmlFor="metascore">
          Metascore
          <input
            type="text"
            className="metascore"
            id="metascore"
            value={item.metascore}
            onChange={handleChange}
            name="metascore"
          />
        </label>
        <label htmlFor="stars">
          Stars
          <input
            type="text"
            className="stars"
            id="stars"
            value={item.stars}
            onChange={handleChange}
            name="stars"
          />
        </label>
        <button>Update</button>
      </form>
    </>
  );
};

export default UpdateMovieForm;
