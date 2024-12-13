import React from "react";
import SavedSearchCard from "../SavedSearchCard/SavedSearchCard";

import "./SavedSearchSection.css";

function SavedSearchSection({}) {
  return (
    <main className="search-section">
      <div className="search-section__cards">
        <SavedSearchCard />
        <SavedSearchCard />
        <SavedSearchCard />
        <SavedSearchCard />
        <SavedSearchCard />
      </div>
    </main>
  );
}

export default SavedSearchSection;
