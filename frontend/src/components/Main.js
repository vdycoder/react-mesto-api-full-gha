import { useContext } from 'react';

import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards
  }) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile" aria-label="profile">
        <button
          type="button"
          className="profile__btn-avatar"
          onClick={() => { onEditAvatar(true) }}
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        >
        </button>
        <div className="profile__container">
          <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__btn-edit"
              onClick={() => { onEditProfile(true) }}
            ></button>
        </div>
        <p className="profile__about">{currentUser.about}</p>
        <button
          type="button"
          className="profile__btn-add"
          onClick={() => { onAddPlace(true) }}
        ></button>
      </section>
      <section className="elements" aria-label="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
