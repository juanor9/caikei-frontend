import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import RegisterPage from './pages/Register/Register';
import UserProfile from './pages/UserProfile/UserProfile';
import './App.scss';

const App = () => {
  useEffect(() => {
    document.title = 'Caikei';
  }, []);
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
