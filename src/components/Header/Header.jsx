import React from "react";
import { Link } from "react-router-dom";
import closebtn from "../../assets/closebtn.png";
import hamburger from "../../assets/hamburgermenu.png";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import { CurrentUserContext } from "../../contexts/CurrentUser";
import { IsLoggedInContext } from "../../contexts/IsLoggedIn";

function Header({}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isLoggedIn = React.useContext(IsLoggedInContext);

  return (
    <header className="header">
      <h1>Study Helper</h1>
      <Navigation />
    </header>
  );
}

export default Header;
