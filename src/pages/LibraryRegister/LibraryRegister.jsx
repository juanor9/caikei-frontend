import './LibraryRegister.scss';
import TopNav from '../../components/TopNav/TopNav';
import RegisterLibraryForm from '../../feature/libraries/components/RegisterLibraryForm/RegisterLibraryForm';

const RegisterLibraryPage = () => (
  <div className="library-register">
    <TopNav />
    <main className="library-register__main-container">
      <h2>Registra una librería</h2>
      <RegisterLibraryForm />
    </main>
  </div>
);

export default RegisterLibraryPage;
