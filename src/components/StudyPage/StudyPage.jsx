import React from "react";

import "./StudyPage.css";

function StudyPage({ currentTopic }) {
  return (
    <main className="studypage">
      <div className="studypage__info">

        <h2 className="studypage__topic">You want to learn about: {currentTopic.userTopic}</h2>
        <h3 className="studypage__overview-heading">Here's an overview and a study tip:</h3>
        <p className="studypage__overview">{currentTopic.topicResponse}
        </p>
       
      </div>
     
    </main>
  );
}

export default StudyPage;
