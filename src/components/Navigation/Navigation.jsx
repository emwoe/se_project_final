import React from "react";
import { Link } from "react-router-dom";
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
        <Link to="/">Home</Link>
        <Link to="/search-page">New Search</Link>
        <Link to="/study-page">Study Page</Link>
        <Link to="/topic-library">Past Searches</Link>
      </div>
    </div>
  );
}

export default Navigation;
