import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import "./App.css";
import * as token from "../../utils/token.js";
import { CurrentUserContext } from "../../contexts/CurrentUser.js";
import { IsLoggedInContext } from "../../contexts/IsLoggedIn.js";
import StudyPage from "../StudyPage/StudyPage.jsx";
import SavedSearchSection from "../SavedSearchSection/SavedSearchSection.jsx";
import SearchPage from "../SearchPage/SearchPage.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
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

  const handleRegistration = ({ email, password, name }) => {
    const makeRequest = () => {
      return auth.register({ email, password, name }).then((data) => {
        setIsLoggedIn(true);
        setCurrentUser({
          name: data.name,
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
              <Route path="/search-page" element={<SearchPage />} />
              <Route
                path="/study-page"
                element={<StudyPage currentTopic={currentTopic} />}
              />
              <Route path="/topic-library" element={<SavedSearchSection />} />
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
