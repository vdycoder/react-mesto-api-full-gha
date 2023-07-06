import { useContext, useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import PopupWithForm from './PopupWithForm';

function EditProfilePopup({
    isOpen,
    onClose,
    onUpdateUser,
    onWaitLoading,
    onCloseByOverlay
  }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      title='Редактировать профиль'
      name='edit-profile'
      buttonText={onWaitLoading ? `Сохранение...` : `Сохранить`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onCloseByOverlay={onCloseByOverlay}
    >
      <div className="popup__item">
        <input
          type="text"
          id="name"
          name="name"
          className="popup__input popup__input_el_name"
          placeholder="Имя"
          tabIndex="1"
          minLength="2"
          maxLength="40"
          required
          value={name || ""}
          onChange={handleNameChange}
        />
        <span className="popup__input-error popup__input-error_field_name"></span>
      </div>
      <div className="popup__item">
        <input
          type="text"
          id="about"
          name="about"
          className="popup__input popup__input_el_about"
          placeholder="О себе"
          tabIndex="2"
          minLength="2"
          maxLength="200"
          required
          value={description || ""}
          onChange={handleDescriptionChange}
        />
        <span className="popup__input-error popup__input-error_field_about"></span>
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
