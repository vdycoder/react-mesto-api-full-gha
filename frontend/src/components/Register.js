import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }

  return (
    <div className="auth">
      <div className="auth__container">
        <form
          id="register-form"
          name="register-form"
          className="auth__form"
          onSubmit={handleSubmit}
        >
          <h2 className="auth__title">Регистрация</h2>
          <fieldset className="auth__input-wrapper">
            <input
              id="email-input"
              name="email-input"
              className="auth__input"
              type="text"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
            <input
              id="password-input"
              name="password-input"
              className="auth__input"
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={handlePasswordChange}
            />
          </fieldset>
          <button
            id="auth-btn"
            className="auth__btn"
            type="submit"
          >Зарегистрироваться</button>
        </form>
        <Link
            to="/sign-in"
            className="auth__link"
          >Уже зарегистрированы? Войти</Link>
      </div>
    </div>
  )
}

export default Register;
