import React from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

import "./SearchForm.css";

function SearchForm() {
  const { values, errors, isValid, handleChange } = useFormAndValidation();

  return (
    <form className="search-form">
      <h3 className="search-form__title">
        What do you want to learn about today?
      </h3>
      <p className="search-form__instructions">
        Please enter a search term. We recommend a historical event, scientific
        process, or theoretical concept.{" "}
      </p>
      <input
        className="search-form__input"
        type="text"
        default="Your search here"
      ></input>

      <button
        type="submit"
        className={`modal__submit-btn ${!isValid ? "modal__btn_inactive" : ""}`}
        disabled={!isValid}
      >
        Let's go!
      </button>
    </form>
  );
}

export default SearchForm;
