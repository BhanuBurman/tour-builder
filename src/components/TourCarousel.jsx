import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 1,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
  }),
  center: {
    x: 0,
    opacity: 1,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
  },
  exit: (direction) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
  }),
};

const TourCarousel = ({ phaseList, onClose }) => {
  const steps = phaseList;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    if (currentIndex < steps.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const imageRef = useRef(null);

  return (
    <div className="w-full flex flex-col items-center p-2 z-40">
      <div className="w-250 flex justify-between items-center bg-white rounded-lg mb-2 px-4 py-2 shadow">
        <p className="text-2xl font-semibold">Interactive Tour</p>
        <p className="text-lg">{currentIndex+1}/{steps.length}</p>
        <button
          onClick={onClose}
          className="bg-red-600 hover:bg-red-700 text-white text-lg font-semibold px-3 py-1 rounded ml-30"
        >
          X
        </button>
      </div>

      {steps.length === 0 ? (
        <div>There is no custom tour found!</div>
      ) : (
        <div className="flex items-center">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="w-30 h-30 bg-gray-300 text-gray-800 px-4 py-2  disabled:opacity-50 rounded-full hover:-mt-3
              transition-all text-2xl font-semibold"
          >
            Previous
          </button>
          <div className="relative w-250 overflow-hidden rounded-lg bg-black p-3 mx-5">
            <div className="relative w-full h-[35rem]">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "smooth" }}
                  className="bg-white p-4 rounded-lg shadow-xl h-full flex flex-col justify-start"
                >
                  <h3 className="text-xl font-semibold mb-2 w-full text-center">
                    {steps[currentIndex].title}
                  </h3>
                  <div className="relative w-full flex justify-center items-center">
                    <img
                      src={steps[currentIndex].image}
                      alt={steps[currentIndex].title}
                      className="rounded mb-3 w-[90%] h-100 object-cover mx-auto"
                      ref={imageRef}
                      onLoad={() => {
                        if (imageRef.current) {
                          setImageSize({
                            width: imageRef.current.offsetWidth,
                            height: imageRef.current.offsetHeight,
                          });
                        }
                      }}
                    />
                    {(steps[currentIndex].toolTips || []).map((tooltip, idx) => (
                      <div
                        key={idx}
                        className="absolute bg-blue-600 h-7 text-white text-xs px-2 py-1 rounded shadow flex flex-col justify-center items-center"
                        style={{
                          top: `calc(${tooltip.y}% + 0px)`,
                          left: `calc(${tooltip.x}% + 0px)`,
                          transform: "translate(-60%, -170%)",
                          pointerEvents: "none",
                        }}
                      >
                        <p className="mb-1">{tooltip.text}</p>
                        <p className="w-0 h-0  -mb-3 border-l-10 border-r-10 border-t-10 border-l-transparent border-r-transparent border-t-blue-600"></p>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-600 bg-gray-200 p-3 rounded-md overflow-y-scroll">
                    {steps[currentIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <button
            onClick={handleNext}
            disabled={currentIndex === steps.length - 1}
            className="w-30 h-30 bg-blue-500 text-white px-4 py-2 disabled:opacity-50 rounded-full hover:-mt-3
              transition-all text-2xl font-semibold"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TourCarousel;
