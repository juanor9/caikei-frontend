import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './TopNav.scss';

const TopNav = () => {
  const token = localStorage.getItem('login-token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <header className="topnav">
      <Logo className="topnav__logo" />
      <nav>
        <ul className="topnav__ul">
          <li><Link to="/catalogue" className="topnav__link">Catálogo</Link></li>
          <li><Link to="/libraries" className="topnav__link">Librerías</Link></li>
          <li><Link to="/movements" className="topnav__link">Movimientos </Link></li>

        </ul>
      </nav>
      <nav>
        {token
          ? <Link to="/profile"><FontAwesomeIcon icon={faUser} /></Link>
          : <Link to="/login"><FontAwesomeIcon icon={faUser} /></Link>}
        <button
          type="button"
          className="topnav__logout-button"
          onClick={handleLogout}
        >
          <FontAwesomeIcon icon={faPowerOff} />
        </button>
      </nav>
    </header>
  );
};
export default TopNav;
