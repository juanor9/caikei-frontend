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
import RegisterLibraryPage from './pages/LibraryRegister/LibraryRegister';
import LibrariesPage from './pages/Libraries/Libraries';
import LibraryPage from './pages/Library/Library';
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
        <Route path="/library/register" element={<RegisterLibraryPage />} />
        <Route path="/libraries" element={<LibrariesPage />} />
        <Route path="/library/:id" element={<LibraryPage />} />

      </Routes>
      <Footer />
    </div>
  );
};

export default App;
