import React from "react";
import sideimage from "../../assets/studyhelpersearchpageimg.jpg";
import SearchForm from "../SearchForm/SearchForm";


import "./SearchPage.css";

function SearchPage({ onAddTopic, isLoading, isTopicReady, setIsTopicReady }) {
  return (
    <main className="searchpage">
      <img className="searchpage__img" src={sideimage} />
      <div className="searchpage__form-container">
      <SearchForm onAddTopic={onAddTopic} isLoading={isLoading} isTopicReady={isTopicReady} setIsTopicReady={setIsTopicReady}/>
      </div>
    </main>
  );
}

export default SearchPage;
