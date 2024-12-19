import React from "react";
import SavedSearchCard from "../SavedSearchCard/SavedSearchCard";
import { CurrentUserContext } from "../../contexts/CurrentUser";
import "./SavedSearchSection.css";


function SavedSearchSection({ topicLibrary, handleTopicCardClick, handleDeleteClick }) {

  const currentUser = React.useContext(CurrentUserContext);

  const ownTopics = topicLibrary.filter(
    (item) => item.owner === currentUser._id
  );
  

  return (
    <main className="search-section">
      <ul className="search-section__cards">
        {ownTopics.map((item) => {
          return (
            <SavedSearchCard
              item={item}
              key={item._id}
              handleTopicCardClick={handleTopicCardClick}
              handleDeleteClick={handleDeleteClick}
            />
          );
        })}
      </ul>
    </main>
  );
}

export default SavedSearchSection;
