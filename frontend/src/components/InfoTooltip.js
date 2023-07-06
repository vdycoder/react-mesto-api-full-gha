import successImg from '../images/success.svg';
import failImg from '../images/fail.svg';

function InfoTooltip ({ isOpen, onClose, onCloseByOverlay, isSuccess }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`} onClick={onCloseByOverlay}>
      <div className="popup__container">
        <button
          id="success-close-button"
          type="button"
          className="popup__btn-close"
          onClick={onClose}
        />
        <div className="popup__content popup__content_type_signup">
          <img
            className="popup__signup-image"
            src={`${isSuccess ? successImg : failImg}`}
            alt={`${isSuccess ? "success Image" : "fail Image"}`}
          />
          <h2 className="popup__signup-title">
            {`${isSuccess ? (
              "Вы успешно зарегистрировались!"
              ) : (
              "Что-то пошло не так! Попробуйте ещё раз."
              )}`
            }
          </h2>
        </div>
      </div>
    </div>
  )
}

export default InfoTooltip;
