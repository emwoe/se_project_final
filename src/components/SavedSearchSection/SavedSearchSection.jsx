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
      <h2 className="search-section__title">Your Searches</h2>
      <p className="search-section__text">Clicking on a card in your library will reset the Study Page for this topic.</p>
      <div className="search-section__card-wrapper">
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
      </div>
    </main>
  );
}

export default SavedSearchSection;
