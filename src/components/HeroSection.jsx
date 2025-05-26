import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import bgImg from "../assets/bg-img.png";

export default function HeroSection({ onStart }) {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex items-center justify-between bg-gray-100 relative overflow-hidden pl-20">
      {/* Left Content */}
      <section className="min-h-screen w-1/2 flex flex-col items-start justify-center text-start px-10 z-10 ">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Welcome to the Product Tour Builder
        </motion.h1>
        <p className="text-lg text-gray-600 mb-6">
          Create interactive, visual stories for your product
        </p>
        <div className="flex">
          <button
            onClick={() => navigate("/tour")}
            className="bg-white border-2 px-6 py-3 rounded-xl hover:opacity-90 transition cursor-pointer"
          >
            Start Demo
          </button>
          <button
            onClick={() => navigate("/build")}
            className="bg-black text-white px-6 py-3 rounded-xl hover:opacity-90 transition ml-5 cursor-pointer"
          >
            Build Tour
          </button>
        </div>
      </section>

      {/* Right Content (Image and Polygon Overlay) */}
      <div className=" h-full relative">
        <img
          src={bgImg}
          alt="bg"
          className="relative w-[80%] h-full object-contain z-20 mt-10"
        />

        {/* Polygon Overlay */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-black clip-polygon z-10"
          initial={{ x: "100%", opacity: 0.5 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        ></motion.div>
      </div>
    </div>
  );
}
