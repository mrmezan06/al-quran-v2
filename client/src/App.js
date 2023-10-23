import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookIndexPage from './pages/Hadith/BookIndexPage';
import SuraPage from './pages/Sura/SuraPage';
import About from './pages/About';
import HadithIndex from './pages/Hadith/HadithIndex';
import HadithPage from './pages/Hadith/HadithPage';
import HadithByChapter from './pages/Hadith/HadithByChapter';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="container-fluid p-2 fix">
        <Routes>
          <Route
            path="/hadith/chapter/:book_key/:start/:range/:chapter"
            element={<HadithByChapter />}
          />
          <Route
            path="/hadith/index/:book_key/:pageNumber"
            element={<BookIndexPage />}
          />
          <Route path="/hadith/index/:book_key" element={<BookIndexPage />} />
          <Route path="/hadith/index" element={<HadithIndex />} exact />
          <Route
            path="/hadith/:book_key/:pageNumber"
            element={<HadithPage />}
          />
          <Route path="/hadith/:book_key" element={<HadithPage />} />
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
