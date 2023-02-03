/* eslint-disable no-unused-vars */
import './LibraryRegister.scss';
import TopNav from '../../components/TopNav/TopNav';
import RegisterLibraryForm from '../../feature/libraries/components/RegisterLibraryForm/RegisterLibraryForm';

const RegisterLibraryPage = () => (
  <div className="user-profile">
    <TopNav />
    <main>
      <h2>Registra una librería</h2>
      <RegisterLibraryForm />
    </main>
  </div>
);

export default RegisterLibraryPage;
