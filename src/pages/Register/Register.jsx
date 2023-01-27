import RegisterForm from '../../feature/users/components/RegisterForm/RegisterForm';
import TopNav from '../../components/TopNav/TopNav';

const RegisterPage = () => (
  <div className="register">
    <TopNav />
    <div className="register__main-container">
      <RegisterForm />
    </div>
  </div>
);

export default RegisterPage;
