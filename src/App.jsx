import HeroSection from './components/HeroSection';
import TourCarousel from './components/TourCarousel';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BuildTour from './pages/BuildTour';
import Navbar from './components/Navbar';
import EditImage from './pages/EditImage';


function App() {
  return (
    <BrowserRouter>
        <Navbar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/tour" element={<TourCarousel />} />
        <Route path="/build" element={<BuildTour />} />
        <Route path="/edit-image" element={<EditImage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 
