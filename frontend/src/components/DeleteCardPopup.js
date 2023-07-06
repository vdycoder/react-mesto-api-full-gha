import PopupWithForm from './PopupWithForm';

function DeleteCardPopup({
    isOpen,
    onClose,
    onCardDelete,
    onWaitLoading,
    onCloseByOverlay
  }) {
  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(isOpen);
  }
  return (
    <PopupWithForm
      title='Вы уверены?'
      name='delete-card'
      buttonText={onWaitLoading ? `Удаление...` : `Да`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onCloseByOverlay={onCloseByOverlay}
    >
    </PopupWithForm>

  )
}

export default DeleteCardPopup;
