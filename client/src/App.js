import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SuraPage from './pages/Sura/SuraPage';
import About from './pages/About';
import Login from './pages/user/login/Login';
import Registration from './pages/user/registration/Registration';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="container-fluid p-2 fix">
        <Routes>
          {/* User Section */}
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/register" element={<Registration />} />
          {/* Book Section */}

          {/* Quran Section */}
          <Route path="/sura/:sura_number/:pageNumber" element={<SuraPage />} />
          <Route path="/sura/:sura_number/" element={<SuraPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/page/:pageNumber" element={<HomePage />} />
          <Route path="/" element={<HomePage />} exact />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
