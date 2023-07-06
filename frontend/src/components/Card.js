import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
      `elements__like-button ${isLiked && 'elements__like-button_active'}`
  );

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <li className="elements__item">
      <article className="elements__card">
      {isOwn &&
        <button
            type="button"
            className="elements__trash-button"
            onClick={handleCardDelete}
        />
      }
        <img
          className="elements__image"
          src={card.link}
          alt={card.name}
          onClick={handleCardClick}
        />
        <div className="elements__caption-wrapper">
          <h2 className="elements__caption">{card.name}</h2>
          <div className="elements__likes-wrapper">
            <button
              type="button"
              className={cardLikeButtonClassName}
              onClick={handleLikeClick}
            ></button>
            <p className="elements__likes-count">{card.likes.length}</p>
          </div>
        </div>
      </article>
    </li>
  );
}

export default Card;
