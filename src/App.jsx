import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import LoginPage from './pages/Login/Login';
import UserProfilePage from './pages/UserProfile/UserProfilePage';
import PublisherRegister from './pages/PublisherRegister/PublisherRegister';
import CataloguePage from './pages/Catalogue/Catalogue';
import BookRegisterPage from './pages/BookRegister/BookRegister';
import BookPage from './pages/Book/Book';
import './App.scss';

const App = () => {
  useEffect(() => {
    document.title = 'Caikei';
  }, []);
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/publisher/register" element={<PublisherRegister />} />
        <Route path="/catalogue" element={<CataloguePage />} />
        <Route path="/book/register" element={<BookRegisterPage />} />
        <Route path="/book/:id" element={<BookPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
