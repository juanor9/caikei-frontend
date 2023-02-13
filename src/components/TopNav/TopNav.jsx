import './TopNav.scss';
import {
  faUser, faPowerOff, faBars, faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../Logo/Logo';

const TopNav = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('login-token');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <>
      <header className="topnav" key={`${Math.floor((Math.random() * 1000))}-min`}>
        <Logo className="topnav__logo" />
        <nav className="topnav__desktop">
          <ul className="topnav__ul">
            <li><Link to="/catalogue" className="topnav__link">Catálogo</Link></li>
            <li><Link to="/libraries" className="topnav__link">Librerías</Link></li>
            <li><Link to="/movements" className="topnav__link">Movimientos </Link></li>

          </ul>
        </nav>
        <nav className="topnav__mobile">
          <button
            type="button"
            onClick={() => { setMobileMenu(!mobileMenu); }}
            className="topnav__mobile-button"
          >
            <FontAwesomeIcon icon={faBars} />{' '}
            Navegación
          </button>

        </nav>
        <nav className="topnav__user" key={`${Math.floor((Math.random() * 1000))}-min`}>
          {token
            ? <Link to="/profile"><FontAwesomeIcon icon={faUser} /></Link>
            : <Link to="/login"><FontAwesomeIcon icon={faUser} /></Link>}
          {token
            ? (
              <button
                type="button"
                className="topnav__logout-button"
                onClick={handleLogout}
                key={`${Math.floor((Math.random() * 1000))}-min`}
              >
                <FontAwesomeIcon icon={faPowerOff} />
              </button>
            )
            : null}

        </nav>
      </header>
      {mobileMenu === true
        ? (
          <nav className="topnav__navigation">
            <button
              type="button"
              onClick={() => { setMobileMenu(false); }}
              className="topnav__close-button"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <ul className="topnav__mobile-ul">
              <li className="topnav__mobile-li">
                <Link to="/catalogue" className="topnav__mobile-link">Catálogo</Link>
              </li>
              <li className="topnav__mobile-li">
                <Link to="/libraries" className="topnav__mobile-link">Librerías</Link>
              </li>
              <li className="topnav__mobile-li">
                <Link to="/movements" className="topnav__mobile-link">Movimientos </Link>
              </li>

            </ul>
          </nav>
        )
        : null}
    </>
  );
};
export default TopNav;
