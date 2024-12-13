import React from "react";
import sideimage from "../../assets/studyhelpersearchpageimg.jpg";
import SearchForm from "../SearchForm/SearchForm";

import "./SearchPage.css";

function SearchPage({}) {
  return (
    <main className="searchpage">
      <img className="searchpage__img" src={sideimage} />
      <SearchForm />
    </main>
  );
}

export default SearchPage;
