import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import StudyPage from "../StudyPage/StudyPage.jsx";
import SavedSearchSection from "../SavedSearchSection/SavedSearchSection.jsx";
import SearchPage from "../SearchPage/SearchPage.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import "./App.css";
import * as auth from "../../utils/auth.js";
import * as token from "../../utils/token.js";
import { getEduContent } from "../../utils/openai.js";
import { CurrentUserContext } from "../../contexts/CurrentUser.js";
import { IsLoggedInContext } from "../../contexts/IsLoggedIn.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentTopic, setCurrentTopic] = useState("photosynthesis");

  const handleModalClose = () => {
    setActiveModal("");
  };

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(handleModalClose)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  //  The functions below need to be changed for the correct fields

  const handleRegistration = ({ username, email, password }) => {
    const makeRequest = () => {
      return auth.register({ username, email, password }).then((data) => {
        setIsLoggedIn(true);
        setCurrentUser({
          username: data.username,
          _id: data._id,
          email: data.email,
        });
      });
    };
    handleSubmit(makeRequest);
  };

  const handleLogin = ({ email, password }) => {
    const makeRequest = () => {
      return auth.login({ email, password }).then((data) => {
        console.log(data);
        if (data.usertoken) {
          token.setToken(data.usertoken);
          setCurrentUser(data.userdata);
          setIsLoggedIn(true);
        }
      });
    };

    handleSubmit(makeRequest);
  };

  const handleRegClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    token.clearToken();
  };

  const handleTopicCardClick = (card) => {
    setCurrentTopic(card);
  };

  const getTopicResponse = ({ values }, resetForm) => {
    getEduContent(values.userTopic).then((data) => setTopic(data));
  };

  useEffect(() => {
    function handleEscClose(evt) {
      evt.key === "Escape" && handleModalClose();
    }

    function handleRemoteClick(evt) {
      if (evt.target.classList.contains("modal__overlay")) {
        handleModalClose();
      }
    }

    if (activeModal !== "") {
      document.addEventListener("keydown", handleEscClose);
      document.addEventListener("click", handleRemoteClick);
    }

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("click", handleRemoteClick);
    };
  }, [activeModal]);

  return (
    <IsLoggedInContext.Provider value={isLoggedIn}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="app">
          <div className="app__content">
            <Header
              handleRegClick={handleRegClick}
              handleLoginClick={handleLoginClick}
            />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route
                path="/search-page"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <SearchPage getTopicResponse={getTopicResponse} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/study-page"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <StudyPage currentTopic={currentTopic} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/topic-library"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <SavedSearchSection
                      handleTopicCardClick={handleTopicCardClick}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
          <RegisterModal
            activeModal={activeModal}
            handleModalClose={handleModalClose}
            isOpen={activeModal === "register"}
            handleRegistration={handleRegistration}
            handleLoginClick={handleLoginClick}
            isLoading={isLoading}
          />
          <LoginModal
            activeModal={activeModal}
            handleModalClose={handleModalClose}
            isOpen={activeModal === "login"}
            handleLogin={handleLogin}
            handleRegClick={handleRegClick}
            isLoading={isLoading}
          />
        </div>
      </CurrentUserContext.Provider>
    </IsLoggedInContext.Provider>
  );
}

export default App;
