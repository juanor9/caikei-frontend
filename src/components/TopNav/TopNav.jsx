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
        <ul>
          <Link to="/catalogue">Catálogo</Link>
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
