import './MovementRegister.scss';
import TopNav from '../../components/TopNav/TopNav';
import MovementRegisterForm from '../../feature/movements/components/MovementRegisterForm/MovementRegisterForm';

const RegisterMovementPage = () => (
  <div className="register-movement">
    <TopNav />
    <main className="register-movement__main-container">
      <h2>Registra un nuevo movimientos</h2>
      <MovementRegisterForm />
    </main>
  </div>
);

export default RegisterMovementPage;
