import React from "react";
import "./Header.css";
import hamburgermenu from "../../assets/hamburgermenu.png";
import Navigation from "../Navigation/Navigation";
import { CurrentUserContext } from "../../contexts/CurrentUser";
import { IsLoggedInContext } from "../../contexts/IsLoggedIn";

function Header({ handleRegClick, handleLoginClick, handleLogout, handleHamburgerClick }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isLoggedIn = React.useContext(IsLoggedInContext);

  return (
    <header className="header">
      <h1 className="header__logo">STUDY HELPER</h1>
      <Navigation
        handleRegClick={handleRegClick}
        handleLoginClick={handleLoginClick}
        handleLogout={handleLogout}
      />
      <button onClick={handleHamburgerClick} className="header__mobile-menu">
        <img className="header__menu-img" src={hamburgermenu}/>
      </button>
    </header>
  );
}

export default Header;
