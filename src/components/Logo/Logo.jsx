import { Link } from 'react-router-dom';
import './Logo.scss';

const Logo = () => (
  <Link to="/" className="logo-link">
    <h1 className="logo"><span lang="ja">計</span>Caikei</h1>
  </Link>
);

export default Logo;
