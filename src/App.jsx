import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import BookPage from './pages/Book/Book';
import BookRegisterPage from './pages/BookRegister/BookRegister';
import CataloguePage from './pages/Catalogue/Catalogue';
import Footer from './components/Footer/Footer';
import HomePage from './pages/Home/Home';
import LibrariesPage from './pages/Libraries/Libraries';
import LibraryPage from './pages/Library/Library';
import LoginPage from './pages/Login/Login';
import PublisherRegister from './pages/PublisherRegister/PublisherRegister';
import RegisterLibraryPage from './pages/LibraryRegister/LibraryRegister';
import UserProfilePage from './pages/UserProfile/UserProfilePage';
import MovementsPage from './pages/Movements/Movements';
import MovementPage from './pages/Movement/Movement';
import RegisterMovementPage from './pages/MovementRegister/MovementRegister';
import TermsAndConditions from './pages/TermsAndConditions/TermsAndConditions';
import ImportInventory from './pages/ImportInventory/ImportInventory';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import BugReportForm from './components/BugReportForm/BugReportForm';
import ImportCatalogue from './pages/ImportCatalogue/ImportCatalogue';

const App = () => {
  useEffect(() => {
    document.title = 'Caikei';
  }, []);
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book/:id" element={<BookPage />} />
        <Route path="/book/register" element={<BookRegisterPage />} />
        <Route path="/book/import" element={<ImportCatalogue />} />
        <Route path="/catalogue" element={<CataloguePage />} />
        <Route path="/libraries" element={<LibrariesPage />} />
        <Route path="/library/:id" element={<LibraryPage />} />
        <Route path="/library/register" element={<RegisterLibraryPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/publisher/register" element={<PublisherRegister />} />
        <Route path="/movements" element={<MovementsPage />} />
        <Route path="/movement/:id" element={<MovementPage />} />
        <Route path="/movement/register" element={<RegisterMovementPage />} />
        <Route path="/movement/import" element={<ImportInventory />} />

        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />

      </Routes>
      <BugReportForm />
      <Footer />
    </div>
  );
};

export default App;
