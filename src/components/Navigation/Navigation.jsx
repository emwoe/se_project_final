import React from "react";
import { IsLoggedInContext } from "../../contexts/IsLoggedIn";
import "./Navigation.css";

function Navigation({ handleRegClick, handleLoginClick }) {
  const isLoggedIn = React.useContext(IsLoggedInContext);

  return (
    <div className="navigation">
      <div
        className={`navigation_loggedout ${
          isLoggedIn === true && "navigation_loggedout-invsb"
        }`}
      >
        <button onClick={handleRegClick}>Sign up</button>
        <button onClick={handleLoginClick}>or Sign in</button>
      </div>
      <div
        className={`navigation_loggedin ${
          isLoggedIn === false && "navigation_loggedin-invsb"
        }`}
      >
        <button>Study Page</button>
        <button>Past Searches</button>
      </div>
    </div>
  );
}

export default Navigation;
