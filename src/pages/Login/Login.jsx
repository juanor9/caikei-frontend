import TopNav from '../../components/TopNav/TopNav';
import './Login.scss';
import LoginForm from '../../feature/users/components/LoginForm/LoginForm';

const RegisterPage = () => (
  <div className="register">
    <TopNav />
    <div className="register__main-container">
      <LoginForm />
    </div>
  </div>
);

export default RegisterPage;
