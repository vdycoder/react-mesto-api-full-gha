import { useEffect, useRef } from 'react';

import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({
    isOpen,
    onClose,
    onUpdateAvatar,
    onWaitLoading,
    onCloseByOverlay
  }) {
  const refAvatar = useRef();

  useEffect(() => {
    refAvatar.current.value = '';
  }, [isOpen]);

  function handleAvatarChange(e) {
    return refAvatar.current.value;
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: refAvatar.current.value,
    });
  }

  return (
    <PopupWithForm
    title='Обновить аватар'
    name='edit-avatar'
    buttonText={onWaitLoading ? `Сохранение...` : `Сохранить`}
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    onCloseByOverlay={onCloseByOverlay}
    >
      <div className="popup__item">
        <input
          type="url"
          id="avatar_image"
          name="image"
          className="popup__input popup__input_el_image"
          placeholder={"Ссылка на картинку" || ""}
          tabIndex="1"
          required
          onChange={handleAvatarChange}
          ref={refAvatar}
        />
        <span className="popup__input-error popup__input-error_field_image"></span>
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
