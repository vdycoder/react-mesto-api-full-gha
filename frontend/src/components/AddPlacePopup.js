import { useState, useEffect } from "react";

import PopupWithForm from './PopupWithForm';

function AddPlacePopup({
    isOpen,
    onClose,
    onAddPlace,
    onWaitLoading,
    onCloseByOverlay
  }) {
  const [placeName, setPlaceName] = useState('');
  const [placeLink, setPlaceLink] = useState('');

  useEffect(() => {
    setPlaceName('');
    setPlaceLink('');
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
        name: placeName,
        link: placeLink
    });
}

  function handlePlaceNameChange(e) {
      setPlaceName(e.target.value);
  }

  function handlePlaceLinkChange(e) {
      setPlaceLink(e.target.value);
  }

  return (
    <PopupWithForm
      title='Новое место'
      name='add-card'
      buttonText={onWaitLoading ? `Сохранение...` : `Сохранить`}
      isOpen={isOpen}
      onClose={onClose}
      onAddPlace={onAddPlace}
      onSubmit={handleSubmit}
      onCloseByOverlay={onCloseByOverlay}
    >
      <div className="popup__item">
        <input
          type="text"
          id="caption"
          name="caption"
          className="popup__input popup__input_el_caption"
          placeholder={"Название" || ""}
          tabIndex="1"
          minLength="2"
          maxLength="30"
          required
          value={placeName || ''}
          onChange={handlePlaceNameChange}
        />
        <span
          className="popup__input-error popup__input-error_field_caption"
        ></span>
      </div>
      <div className="popup__item">
        <input
          type="url"
          id="image"
          name="image"
          className="popup__input popup__input_el_image"
          placeholder={"Ссылка на картинку" || ""}
          tabIndex="2"
          required
          value={placeLink || ''}
          onChange={handlePlaceLinkChange}
        />
        <span
          className="popup__input-error popup__input-error_field_image"
        ></span>
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
