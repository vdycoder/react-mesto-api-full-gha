import { useState } from 'react';

function Login({ onLogin }) {
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
    onLogin(email, password);
  }

  return (
    <div className="auth">
      <div className="auth__container">
        <form
          id="login-form"
          name="login-form"
          className="auth__form"
          onSubmit={handleSubmit}
        >
          <h2 className="auth__title">Вход</h2>
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
            type="submit"
            className="auth__btn"
          >Войти</button>
        </form>
      </div>
    </div>
  )
}

export default Login;
