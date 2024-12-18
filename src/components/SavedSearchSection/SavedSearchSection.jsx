import React from "react";
import SavedSearchCard from "../SavedSearchCard/SavedSearchCard";
import { CurrentUserContext } from "../../contexts/CurrentUser";
import "./SavedSearchSection.css";


function SavedSearchSection({ topicLibrary, handleTopicCardClick }) {

  const currentUser = React.useContext(CurrentUserContext);

  const ownTopics = topicLibrary.filter(
    (item) => item.owner === currentUser._id
  );

  
  ownTopics.map((item)=>{console.log(item)});
  

  console.log(topicLibrary);
  console.log(ownTopics);
  

  return (
    <main className="search-section">
      <div className="search-section__cards">
        <ul className="search-section__list">
        {ownTopics.map((item) => {
          return (
            <SavedSearchCard
              item={item}
            />
          );
        })}
      </ul>
      </div>
    </main>
  );
}

export default SavedSearchSection;
