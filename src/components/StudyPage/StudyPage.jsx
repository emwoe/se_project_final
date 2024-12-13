import React from "react";
import imagetall from "../../assets/studyhelpersidebarimg.jpg";

import "./StudyPage.css";

function StudyPage({}) {
  return (
    <main className="studypage">
      <div className="studypage__info">
        <h2 className="studypage__topic">Topic: SAMPLE</h2>
        <h3 className="studypage__overview-heading">Here's an overview:</h3>
        <p className="studypage__overview">
          Here's some sample text about what you'd like to learn about.
        </p>
        <h3 className="studypage__strategy-heading">Try this:</h3>
        <p className="studypage__strategy">
          This is where you'll find ideas for how to learn the information
          above.
        </p>
      </div>
      <div className="studypage__img-bar">
        <img className="studypage__img" src={imagetall}></img>
      </div>
    </main>
  );
}

export default StudyPage;
