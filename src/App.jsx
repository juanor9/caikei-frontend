import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import LoginPage from './pages/Login/Login';
import UserProfile from './pages/UserProfile/UserProfile';
import PublisherRegister from './pages/PublisherRegister/PublisherRegister';
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
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/publisher/register" element={<PublisherRegister />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
