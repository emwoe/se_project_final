import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import RegisterModal from '../RegisterModal/RegisterModal.jsx'
import LoginModal from '../LoginModal/LoginModal.jsx'
import MenuModal from '../MenuModal/MenuModal.jsx'
import StudyPage from '../StudyPage/StudyPage.jsx'
import SavedSearchSection from '../SavedSearchSection/SavedSearchSection.jsx'
import SearchPage from '../SearchPage/SearchPage.jsx'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx'
import Preloader from '../Preloader/Preloader.jsx'
import './App.css'
import { getTopics, postTopic, deleteTopic } from '../../utils/api.js'
import * as auth from '../../utils/auth.js'
import * as token from '../../utils/token.js'
import { fetchTopicDataFromBackend } from '../../utils/openai.js'
import { CurrentUserContext } from '../../contexts/CurrentUser.js'
import { IsLoggedInContext } from '../../contexts/IsLoggedIn.js'

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [activeModal, setActiveModal] = useState('')
    const [currentUser, setCurrentUser] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [currentTopic, setCurrentTopic] = useState({})
    const [topicLibrary, setTopicLibrary] = useState([])
    const [isTopicReady, setIsTopicReady] = useState(false)

    const handleModalClose = () => {
        setActiveModal('')
    }

    function handleSubmit(request) {
        setIsLoading(true)
        request()
            .then(handleModalClose)
            .catch(console.error)
            .finally(() => setIsLoading(false))
    }

    //  login, log out and registration //

    const handleRegistration = ({ username, email, password }) => {
        console.log({ username })
        const makeRequest = () => {
            return auth.register({ username, email, password }).then((data) => {
                setIsLoggedIn(true)
                console.log(data)
                setCurrentUser({
                    username: data.username,
                    _id: data._id,
                    email: data.email,
                })
                setCurrentTopic({})
            })
        }
        handleSubmit(makeRequest)
        auth.getUserInfo(jwt)
    }

    const handleLogin = ({ email, password }) => {
        const makeRequest = () => {
            return auth.login({ email, password }).then((data) => {
                if (data.usertoken) {
                    token.setToken(data.usertoken)
                    setCurrentUser(data.userdata)
                    setCurrentTopic({})
                    setIsLoggedIn(true)
                }
            })
        }

        handleSubmit(makeRequest)
    }

    const handleRegClick = () => {
        setActiveModal('register')
    }

    const handleLoginClick = () => {
        setActiveModal('login')
    }

    const handleLogout = () => {
        setIsLoggedIn(false)
        token.clearToken()
        setCurrentUser({})
    }

    //  Mobile menu //

    const handleHamburgerClick = () => {
        setActiveModal('mobile-menu')
        console.log(activeModal)
    }

    //  search and add-topic functionality //

    const getTopicResponse = async (userTopic) => {
        try {
            console.log('getting response for user:')
            console.log(currentUser)
            console.log(userTopic)
            const data = await fetchTopicDataFromBackend(userTopic)
            data._id = currentUser._id
            console.log('data package contains')
            console.log(data)
            return data
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    const onAddTopic = async ({ values }, resetForm, currentUser) => {
        const jwt = token.getToken()

        const makeRequest = async () => {
            let colorNum = Math.floor(Math.random() * 5)
            try {
                const topicData = await getTopicResponse(values.userTopic)
                if (colorNum == 0) {
                    topicData.color = 'blue'
                } else if (colorNum == 1) {
                    topicData.color = 'green'
                } else if (colorNum == 2) {
                    topicData.color = 'yellow'
                } else if (colorNum == 3) {
                    topicData.color = 'red'
                } else {
                    topicData.color = 'orange'
                }
                console.log(topicData)
                const data = await postTopic(topicData, jwt)
                if (data.data) {
                    setIsTopicReady(true)
                }
                console.log(data.data)
                setCurrentTopic(data.data)
                setTopicLibrary((currentItems) => [data.data, ...currentItems])
                console.log(topicLibrary)
                handleModalClose()
                resetForm()
            } catch (error) {
                console.error('Error while adding topic:', error)
            }
        }

        handleSubmit(makeRequest)
    }

    //  topic card functionality //

    const handleTopicCardClick = (item) => {
        console.log(item)
        setCurrentTopic(item)
    }

    const handleDeleteClick = (item) => {
        const jwt = token.getToken()
        deleteTopic(item._id, jwt)
            .then(() => {
                setTopicLibrary((topics) =>
                    topics.filter((topic) => topic._id != item._id)
                )
            })
            .then(handleModalClose)
            .catch(console.error)
    }

    //  useEffects //

    useEffect(() => {
        function handleEscClose(evt) {
            evt.key === 'Escape' && handleModalClose()
        }

        function handleRemoteClick(evt) {
            if (evt.target.classList.contains('modal__overlay')) {
                handleModalClose()
            } else if (evt.target.classList.contains('menu-modal__overlay')) {
                handleModalClose()
            }
        }

        if (activeModal !== '') {
            document.addEventListener('keydown', handleEscClose)
            document.addEventListener('click', handleRemoteClick)
        }

        return () => {
            document.removeEventListener('keydown', handleEscClose)
            document.removeEventListener('click', handleRemoteClick)
        }
    }, [activeModal])

    useEffect(() => {
        const jwt = token.getToken()

        if (!jwt) {
            return
        }

        auth.getUserInfo(jwt)
            .then(({ data }) => {
                console.log(data)
                setIsLoggedIn(true)
                setCurrentUser({
                    username: data.username,
                    _id: data._id,
                    email: data.email,
                })
            })
            .catch(console.error)
    }, [])

    useEffect(() => {
        if (currentUser._id) {
            console.log('Current user has been set:', currentUser)
        }
    }, [])

    useEffect(() => {
        const jwt = token.getToken()

        getTopics(jwt)
            .then((data) => setTopicLibrary(data.data))
            .catch(console.error)
    }, [])

    return (
        <IsLoggedInContext.Provider value={isLoggedIn}>
            <CurrentUserContext.Provider value={currentUser}>
                <div className="app">
                    <div className="app__content">
                        <Header
                            handleRegClick={handleRegClick}
                            handleLoginClick={handleLoginClick}
                            handleSubmit={handleSubmit}
                            handleLogout={handleLogout}
                            handleHamburgerClick={handleHamburgerClick}
                        />
                        <Routes>
                            <Route path="/" element={<Main />} />
                            <Route
                                path="/search-page"
                                element={
                                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                                        <SearchPage
                                            onAddTopic={onAddTopic}
                                            isLoading={isLoading}
                                            isTopicReady={isTopicReady}
                                            setIsTopicReady={setIsTopicReady}
                                        />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/study-page"
                                element={
                                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                                        <StudyPage
                                            currentTopic={currentTopic}
                                        />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/topic-library"
                                element={
                                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                                        <SavedSearchSection
                                            handleTopicCardClick={
                                                handleTopicCardClick
                                            }
                                            topicLibrary={topicLibrary}
                                            handleDeleteClick={
                                                handleDeleteClick
                                            }
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
                        isOpen={activeModal === 'register'}
                        handleRegistration={handleRegistration}
                        handleLoginClick={handleLoginClick}
                        isLoading={isLoading}
                    />
                    <LoginModal
                        activeModal={activeModal}
                        handleModalClose={handleModalClose}
                        isOpen={activeModal === 'login'}
                        handleLogin={handleLogin}
                        handleRegClick={handleRegClick}
                        isLoading={isLoading}
                    />
                    <MenuModal
                        activeModal={activeModal}
                        handleModalClose={handleModalClose}
                        isOpen={activeModal === 'mobile-menu'}
                    />
                    <Preloader isLoading={isLoading}></Preloader>
                </div>
            </CurrentUserContext.Provider>
        </IsLoggedInContext.Provider>
    )
}

export default App
