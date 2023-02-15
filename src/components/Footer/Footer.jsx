import './Footer.scss';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="footer">
    <div>
      <p className="footer__logo"><span className="footer__ja" lang="ja">計</span>Caikei</p>
      <p>Tanuki SAS | &copy; Todos los derechos reservados</p>
    </div>
    <div>
      <h4>Sobre Caikei</h4>
      <ul className="footer__ul">
        <li>
          <Link to="/terms-and-conditions" className="footer__link">
            Términos y condiciones
          </Link>
        </li>
      </ul>
    </div>
    <div>Col 2</div>

  </footer>
);
export default Footer;
