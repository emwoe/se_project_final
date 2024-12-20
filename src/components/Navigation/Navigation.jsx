import React from 'react'
import { Link } from 'react-router-dom'
import { IsLoggedInContext } from '../../contexts/IsLoggedIn'
import './Navigation.css'

function Navigation({ handleRegClick, handleLoginClick, handleLogout }) {
    const isLoggedIn = React.useContext(IsLoggedInContext)

    return (
        <div className="navigation">
            <div
                className={`navigation_loggedout ${
                    isLoggedIn === true && 'navigation_loggedout-invsb'
                }`}
            >
                <button className="navigation__btn" onClick={handleRegClick}>
                    Sign up
                </button>
                <button
                    className="navigation__signin-btn"
                    onClick={handleLoginClick}
                >
                    or Sign in
                </button>
            </div>
            <div
                className={`navigation_loggedin ${
                    isLoggedIn === false && 'navigation_loggedin-invsb'
                }`}
            >
                <Link className="navigation__link" to="/">
                    Home
                </Link>
                <Link className="navigation__link" to="/search-page">
                    New Search
                </Link>
                <Link className="navigation__link" to="/study-page">
                    Study Page
                </Link>
                <Link className="navigation__link" to="/topic-library">
                    Past Searches
                </Link>
                <button onClick={handleLogout} className="navigation__btn">
                    Log out
                </button>
            </div>
        </div>
    )
}

export default Navigation
