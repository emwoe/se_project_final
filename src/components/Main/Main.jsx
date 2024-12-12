import React from "react";
import imageblock from "../../assets/studyhelperbackgroundimg.jpg";

import "./Main.css";

function Main({}) {
  return (
    <main>
      <img className="main__img-block" src={imageblock}></img>
    </main>
  );
}

export default Main;
