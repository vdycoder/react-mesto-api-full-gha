function ImagePopup({card, onClose, onCloseByOverlay }) {
    return (
        <div className={`popup ${card.link ? "popup_opened" : ""}`} onClick={onCloseByOverlay}>
          <div className="popup__container popup__container_type_show-image">
            <button
              type="button"
              className="popup__btn-close"
              onClick={onClose}
            ></button>
            <div className="popup__content">
              <img src={card.link} alt={card.name} className="popup__image" />
              <p className="popup__caption">{card.name}</p>
            </div>
          </div>
        </div>
    );
}

export default ImagePopup;
