/* eslint-disable no-unused-vars */
import './MovementRegister.scss';
import TopNav from '../../components/TopNav/TopNav';
import MovementRegisterForm from '../../feature/movements/components/MovementRegisterForm/MovementRegisterForm';

const RegisterMovementPage = () => (
  <div className="user-profile">
    <TopNav />
    <main>
      <h2>Registra un nuevo movimiento</h2>
      <MovementRegisterForm />
    </main>
  </div>
);

export default RegisterMovementPage;
