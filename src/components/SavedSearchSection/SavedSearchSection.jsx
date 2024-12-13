import React from "react";
import SavedSearchCard from "../SavedSearchCard/SavedSearchCard";

import "./SavedSearchSection.css";

function SavedSearchSection({ handleTopicCardClick }) {
  return (
    <main className="search-section">
      <div className="search-section__cards">
        <SavedSearchCard onClick={handleTopicCardClick} />
        <SavedSearchCard onClick={handleTopicCardClick} />
        <SavedSearchCard onClick={handleTopicCardClick} />
        <SavedSearchCard onClick={handleTopicCardClick} />
        <SavedSearchCard onClick={handleTopicCardClick} />
      </div>
    </main>
  );
}

export default SavedSearchSection;
