import React from "react";

import "./StudyPage.css";

function StudyPage({ currentTopic }) {
  return (
    <main className="studypage">
      <div className="studypage__info">

        <h2 className="studypage__topic">You want to learn about: {currentTopic.topic}</h2>
        <h3 className="studypage__overview-heading">Here's an overview:</h3>
        <p className="studypage__overview">{currentTopic.topicResponse}</p>
        <h3 className="studypage__overview-heading">And some suggestions for studying:</h3>
        <p className="studypage__overview">{currentTopic.studyTips}</p>
      </div>
     
    </main>
  );
}

export default StudyPage;
