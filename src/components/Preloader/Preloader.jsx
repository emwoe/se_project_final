import React from "react";

import "./Preloader.css";

function Preloader({isLoading}) {
  return (
   <div>
    <img className={`preloader ${
        isLoading === false && "preloader-invbl"
      }`}/>
   </div>
  );
}

export default Preloader;