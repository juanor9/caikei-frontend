/* eslint-disable no-unused-vars */
import './BookRegister.scss';
import TopNav from '../../components/TopNav/TopNav';
import RegisterBookForm from '../../feature/books/components/RegisterBookForm/RegisterBookForm';

const BookRegisterPage = () => {
  const userToken = localStorage.getItem('login-token');
  return (
    <div className="register-book-page">
      <TopNav />
      <main className="register-book-page__main-container">
        <h2>Crear nuevo libro</h2>
        <RegisterBookForm />
      </main>
    </div>
  );
};

export default BookRegisterPage;
