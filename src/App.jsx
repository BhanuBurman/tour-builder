import React, { useState } from 'react';
import HeroSection from './components/HeroSection';
import TourCarousel from './components/TourCarousel';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import BuildTour from './pages/BuildTour';


function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/tour" element={<TourCarousel />} />
        <Route path="/build" element={<BuildTour />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
