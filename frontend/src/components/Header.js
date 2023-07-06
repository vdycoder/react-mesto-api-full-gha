//import { useState } from 'react';
import { Link, useLocation } from "react-router-dom";

import logo from '../images/header-logo-dark.svg';

function Header({ email, onLogout }) {
  const path = useLocation();
  //const [showNavbar, setShowNavbar] = useState(false);

    return (
        <header className="header">
          <img className="header__logo" src={logo} alt="Логотип" />
          {path.pathname === "/sign-up" && (
            <>
            <nav className="header__nav-links">
              <Link to="sign-in" className="header__nav-link">
                Войти
              </Link>
            </nav>
            </>
          )}
          {path.pathname === "/sign-in" && (
            <>
            <nav className="header__nav-links">
              <Link to="sign-up" className="header__nav-link">
                Регистрация
              </Link>
            </nav>
            </>
          )}
          {path.pathname === "/" && (
            <>
            <nav className="header__nav-links">
              <p className="header__nav-link">
                {email}
              </p>
              <button
                onClick={onLogout}
                className="header__nav-btn">
                Выйти
              </button>
            </nav>
            </>
          )}
        </header>
    );
}

export default Header;
