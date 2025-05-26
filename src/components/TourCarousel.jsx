// src/components/TourCarousel.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    title: 'Welcome to ProductMate',
    image: '/images/tour-step1.png',
    description: 'Kickstart your product journey with a beautiful, streamlined dashboard to manage everything in one place.'
  },
  {
    title: 'Track User Behavior',
    image: '/images/tour-step2.png',
    description: 'Understand how users navigate your platform with our powerful analytics and heatmaps.'
  },
  {
    title: 'Customize Your Experience',
    image: '/images/tour-step3.png',
    description: 'Easily tailor workflows and layouts to match your unique brand and team needs.'
  },
  {
    title: 'Launch With Confidence',
    image: '/images/tour-step4.png',
    description: 'Push updates with confidence using our preview, versioning, and rollback tools.'
  }
];

const TourCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < steps.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="w-full flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold mb-4">Interactive Tour</h2>

      <div className="relative w-full max-w-xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-md p-4"
          >
            <h3 className="text-xl font-semibold mb-2">{steps[currentIndex].title}</h3>
            <img src={steps[currentIndex].image} alt={steps[currentIndex].title} className="rounded mb-3 w-full h-60 object-cover" />
            <p className="text-gray-600">{steps[currentIndex].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === steps.length - 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TourCarousel;

// Then import and use this component in App.jsx like:
// import TourCarousel from './components/TourCarousel';
// <TourCarousel />