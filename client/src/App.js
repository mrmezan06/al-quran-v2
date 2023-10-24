import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SuraPage from './pages/Sura/SuraPage';
import About from './pages/About';
import Login from './pages/user/login/Login';
import Registration from './pages/user/registration/Registration';
import Upload from './pages/user/upload/Upload';
import EditBook from './pages/user/editBook/EditBook';
import Dashboard from './pages/user/dashboard/Dashboard';
import ManageUser from './pages/user/manageUser/ManageUser';
import Profile from './pages/user/profile/Profile';
import Read from './pages/user/read/Read';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="container-fluid p-2 fix">
        <Routes>
          {/* User Section */}
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/register" element={<Registration />} />
          <Route path="/user/upload" element={<Upload />} />
          <Route path="/user/book/update" element={<EditBook />} />
          <Route path="/user/dashboard" element={<Dashboard />} />
          <Route path="/user/manage" element={<ManageUser />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/read" element={<Read />} />
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
