import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import DeleteCardPopup from './DeleteCardPopup';

import ProtectedRoute from './ProtectedRoute';//new in #12 sprint
import Register from './Register';//new in #12 sprint
import Login from './Login';//new in #12 sprint
import InfoTooltip from './InfoTooltip';//new in #12 sprint

import '../index.css';
import api from '../utils/api';
import authApi from '../utils/authApi'; //new in #12 sprint
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  //new in #12 sprint
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);

  const [isWaitLoading, setIsWaitLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  //new in #12 sprint
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      Promise.all([
        authApi.getUserInfo(jwt),
        api.getInitialCards()
      ])
      .then(([userData, cardsData]) => {
        setIsLoggedIn(true)
        setEmail(userData.email)
        //navigate('/', { replace: true })
        //console.log(userData); // log
        //console.log(cardsData); // log
        setCurrentUser(userData);
        setCards(cardsData);
        })
      .catch(err => {
        console.log(err);
      });
    } else {
      setIsLoggedIn(false)
    }

/*   if (isLoggedIn) {
      Promise.all([
        api.getUserInfo(),
        api.getInitialCards()
      ])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
        })
      .catch(err => {
        console.log(err);
      });
    }
 */
  }, [isLoggedIn]);

  function closeAllPopups () {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
          setCards((state) => state.map(
            (c) => c._id === card._id ? newCard : c
          ));
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    setIsWaitLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id))
        closeAllPopups()
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setIsWaitLoading(false));
  }

  function handleCardAdd(card) {
    setIsWaitLoading(true);
    api
      .postCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setIsWaitLoading(false));
  }

  function handleUpdateUser(userNewData) {
    setIsWaitLoading(true);
    api
      .updateUserInfo(userNewData)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups()
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setIsWaitLoading(false));
  }

  function handleUpdateAvatar(userAvatar) {
    setIsWaitLoading(true);
    api
      .updateAvatar(userAvatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups()
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setIsWaitLoading(false));
  }

  function closeByOverlay(evt) {
    evt.stopPropagation();
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  }

  useEffect(() => {
    function handleEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isEditAvatarPopupOpen ||
        isEditProfilePopupOpen ||
        isAddPlacePopupOpen ||
        isDeleteCardPopupOpen ||
        selectedCard.link
      ) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    }

  }, [
      isEditAvatarPopupOpen,
      isEditProfilePopupOpen,
      isAddPlacePopupOpen,
      isDeleteCardPopupOpen,
      selectedCard.link,
  ]);

  //new in #12 sprint
  //Проверка токена и авторизация пользователя
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
/*     if (jwt) {
      authApi.getUserInfo(jwt)
        .then(res => {
          if (res) {
            setIsLoggedIn(true)
            setEmail(res.email)
            navigate('/')
          }
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      setIsLoggedIn(false)
    }
 */
    if (jwt) {
      Promise.all([
        authApi.getUserInfo(jwt),
        api.getInitialCards()
      ])
      .then(([userData, cardsData]) => {
        setIsLoggedIn(true)
        setEmail(userData.email)
        navigate('/', { replace: true })
        //console.log(userData); // log
        //console.log(cardsData); // log
        setCurrentUser(userData);
        setCards(cardsData);
        })
      .catch(err => {
        console.log(err);
      });
    } else {
      setIsLoggedIn(false)
    }


  }, [navigate, isLoggedIn]);

  function handleUserRegister(email, password) {
    authApi.signupUser(email, password)
      .then(res => {
        if (res) {
          setIsSuccess(true);
          setIsInfoTooltipPopupOpen(true);
          navigate('/sign-in', { replace: true });
        }
      })
      .catch(err => {
        setIsSuccess(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(err);
      })
  }

  function handleUserLogin(email, password) {
    authApi.signinUser(email, password)
      .then(res => {
        if (res) {
          setIsLoggedIn(true);
          localStorage.setItem('jwt', res.jwt);
          navigate('/', { replace: true });
        }
      })
      .catch(err => {
        setIsSuccess(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(err);
      })
  }

  function handleUserLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    navigate('./sign-in', {replace: true})
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header email={email} onLogout={handleUserLogout} />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  element={
                    <Main
                      onEditProfile={setIsEditProfilePopupOpen}
                      onAddPlace={setIsAddPlacePopupOpen}
                      onEditAvatar={setIsEditAvatarPopupOpen}
                      onCardClick={setSelectedCard}
                      onCardLike={handleCardLike}
                      onCardDelete={setIsDeleteCardPopupOpen}
                      cards={cards}
                    ></Main>
                  }
                ></ProtectedRoute>
              }
            ></Route>
            <Route
              path="/sign-up"
              element={
                <Register onRegister={handleUserRegister} />
              }
            ></Route>
            <Route
              path="/sign-in"
              element={
                <Login onLogin={handleUserLogin} />
              }
            ></Route>
            <Route
              path='/'
              element={
                isLoggedIn ? (
                <Navigate to="/" replace />
                ) : (
                <Navigate to="/sign-in" replace/>
                )
              }
            ></Route>
          </Routes>

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onWaitLoading={isWaitLoading}
            onCloseByOverlay={closeByOverlay}
          ></EditProfilePopup>

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            onWaitLoading={isWaitLoading}
            onCloseByOverlay={closeByOverlay}
          ></EditAvatarPopup>

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleCardAdd}
            onWaitLoading={isWaitLoading}
            onCloseByOverlay={closeByOverlay}
          ></AddPlacePopup>

          <DeleteCardPopup
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}
            onWaitLoading={isWaitLoading}
            onCloseByOverlay={closeByOverlay}
          ></DeleteCardPopup>

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            onCloseByOverlay={closeByOverlay}
          ></ImagePopup>

          {/* new in #12 sprint */}
          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            onCloseByOverlay={closeByOverlay}
            isSuccess={isSuccess}
          ></InfoTooltip>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
