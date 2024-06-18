import { Link } from "react-router-dom";
import Profile from "../../Profile/profile";
import { React, useState } from "react";
import "../../../css/styles.css";
import "../../../css/main.css";


function Header() {
  const [activeLink, setActiveLink] = useState("/");

  const handleNavLinkClick = (to) => {
    setActiveLink(to);
  };
  return (
    <header className="header" id="header">
      <nav className="nav container">
        <img src="/img/favicon.png" alt="logo"></img>
        <div className="nav__menu" id="nav-menu">
          <ul className="nav__list">
            <li className="nav__item">
              <Link
                to="/auth/home"
                className={`nav__link ${
                  activeLink === "/" ? "active-link" : ""
                }`}
                onClick={() => handleNavLinkClick("/auth/home")}
              >
                Home
              </Link>
            </li>
            <li className="nav__item">
              <Link
                to="/auth/about"
                className={`nav__link ${
                  activeLink === "/auth/about" ? "active-link" : ""
                }`}
                onClick={() => handleNavLinkClick("/auth/about")}
              >
                About
              </Link>
            </li>
            <li className="nav__item">
              <Link
                to="/auth/discover"
                className={`nav__link ${
                  activeLink === "/auth/discover" ? "active-link" : ""
                }`}
                onClick={() => handleNavLinkClick("/discover")}
              >
                Discover
              </Link>
            </li>
            <li className="nav__item">
              <Link
                to="/auth/book"
                className={`nav__link ${
                  activeLink === "/auth/book" ? "active-link" : ""
                }`}
                onClick={() => handleNavLinkClick("/book")}
              >
                Book Now
              </Link>
            </li>
            <li className="nav__item ">
              <Link to="#">
                <Profile />
              </Link>
            </li>
          </ul>

          <div className="nav__dark">
            <span className="change-theme-name">Dark mode</span>
            <i className="ri-moon-line change-theme" id="theme-button"></i>
          </div>

          <i className="ri-close-line nav__close" id="nav-close"></i>
        </div>

        <div className="nav__toggle" id="nav-toggle">
          <i className="ri-function-line"></i>
        </div>
      </nav>
    </header>
  );
}

export default Header;
