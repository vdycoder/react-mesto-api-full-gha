function PopupWithForm({
    title,
    name,
    buttonText,
    isOpen,
    onClose,
    onSubmit,
    onCloseByOverlay,
    children
  }) {
  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""}`}
      onClick={onCloseByOverlay}
    >
        <div className="popup__container">
        <button
          type="button"
          className="popup__btn-close"
          tabIndex="4"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <form
          //action="#"
          className="popup__form"
          name={name}
          tabIndex="0"
          //noValidate
          onSubmit={onSubmit}
        >
            <h2 className="popup__title">{title}</h2>
            <fieldset className="popup__items">
                {children}
            </fieldset>
            <button
              type="submit"
              name="submit"
              className="popup__btn-save"
              tabIndex="3"
              //disabled
            >
            {buttonText}
            </button>
        </form>
        </div>
    </div>
  );
}

export default PopupWithForm;
