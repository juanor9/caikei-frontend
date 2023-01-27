import './Home.scss';
import { Link } from 'react-router-dom';
import LoginForm from '../../feature/users/components/LoginForm/LoginForm';
import TopNav from '../../components/TopNav/TopNav';

const HomePage = () => (
  <div className="homepage">
    <TopNav />
    <div className="homepage__main-container">
      <LoginForm />
      <Link to="/register" className="homepage__register-link">Crear una cuenta</Link>
    </div>
  </div>
);

export default HomePage;
