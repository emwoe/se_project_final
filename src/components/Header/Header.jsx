import React from "react";
import { Link } from "react-router-dom";
import closebtn from "../../assets/closebtn.png";
import hamburger from "../../assets/hamburgermenu.png";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import { CurrentUserContext } from "../../contexts/CurrentUser";
import { IsLoggedInContext } from "../../contexts/IsLoggedIn";

function Header({ handleRegClick, handleLoginClick }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isLoggedIn = React.useContext(IsLoggedInContext);

  return (
    <header className="header">
      <h1 className="header__logo">STUDY HELPER</h1>
      <Navigation
        handleRegClick={handleRegClick}
        handleLoginClick={handleLoginClick}
      />
    </header>
  );
}

export default Header;
