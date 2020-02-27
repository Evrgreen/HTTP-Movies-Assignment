import React, { useState } from "react";
import { useForm } from "react-hook-form";

const UpdateMovieForm = () => {
  const [item, SetItem] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: ""
  });
  const { register, error, handleSubmit } = useForm();
  const formSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      <form onSubmit={() => handleSubmit(formSubmit)}>
        <label htmlFor="title">
          Title
          <input
            type="text"
            className="title"
            id="title"
            ref={register}
            name="title"
          />
        </label>
        <label htmlFor="director">
          Director
          <input
            type="text"
            className="director"
            id="director"
            ref={register}
            name="director"
          />
        </label>
        <label htmlFor="metascore">
          Metascore
          <input
            type="text"
            className="metascore"
            id="metascire"
            ref={register}
            name="metascore"
          />
        </label>
        <label htmlFor="stars">
          Stars
          <input
            type="text"
            className="stars"
            id="stars"
            ref={register}
            name="stars"
          />
        </label>
        <button>Update</button>
      </form>
    </>
  );
};

export default UpdateMovieForm;
