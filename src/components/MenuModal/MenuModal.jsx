import React from 'react'
import { Link } from 'react-router-dom'
import './MenuModal.css'
import closeBtn from '../../assets/closebtn.png'

function MenuModal({ isOpen, handleModalClose }) {
    return (
        <div className={`menu-modal ${isOpen === true && 'menu-modal_opened'}`}>
            <div className="menu-modal__overlay">
                <div className="menu-modal__navbox">
                    <Link
                        onClick={handleModalClose}
                        className="menu-modal__link"
                        to="/"
                    >
                        Home
                    </Link>
                    <Link
                        onClick={handleModalClose}
                        className="menu-modal__link"
                        to="/search-page"
                    >
                        New Search
                    </Link>
                    <Link
                        onClick={handleModalClose}
                        className="menu-modal__link"
                        to="/study-page"
                    >
                        Study Page
                    </Link>
                    <Link
                        onClick={handleModalClose}
                        className="menu-modal__link"
                        to="/topic-library"
                    >
                        Past Searches
                    </Link>
                    <button
                        className="menu-modal__close-btn"
                        onClick={handleModalClose}
                    >
                        <img className="menu-modal__close-img" src={closeBtn} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MenuModal
