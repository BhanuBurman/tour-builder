import { motion } from "framer-motion";
import {  useNavigate } from "react-router-dom";
import bgImg from "../assets/bg-img.png";
import { useState } from "react";
import TourCarousel from "./TourCarousel";

export default function HeroSection() {
  const navigate = useNavigate();
  const [isDemoClicked, setIsDemoClicked] = useState(false);

  const selfDemoList = [
  {
    title: "Eiffel Tower Experience",
    image: "https://source.unsplash.com/800x600/?eiffel-tower,paris",
    description: "Witness the breathtaking view of Paris from the top of the iconic Eiffel Tower. Ideal for romantic getaways and historical insights.",
  },
  {
    title: "Safari Adventure in Kenya",
    image: "https://source.unsplash.com/800x600/?safari,kenya",
    description: "Explore the wild savannas of Kenya and get up close with majestic lions, elephants, and more during a guided safari adventure.",
  },
  {
    title: "Japanese Cherry Blossom Tour",
    image: "https://source.unsplash.com/800x600/?cherry-blossom,japan",
    description: "Visit Japan in the spring to witness the enchanting cherry blossoms in full bloom across Tokyo, Kyoto, and more.",
  },
  {
    title: "Northern Lights in Iceland",
    image: "https://source.unsplash.com/800x600/?northern-lights,iceland",
    description: "Experience the magic of the Aurora Borealis in Iceland, a once-in-a-lifetime light show in the Arctic skies.",
  },
  {
    title: "Santorini Sunset Escape",
    image: "https://source.unsplash.com/800x600/?santorini,greece",
    description: "Relax on the whitewashed cliffs of Santorini while enjoying a mesmerizing Aegean sunset and authentic Mediterranean cuisine.",
  },
];

  return (
    <div className="w-full h-screen flex items-center justify-between bg-gray-100 relative overflow-hidden pl-20">
      {
        isDemoClicked && (
          <div className="tour_overlay absolute top-0 left-0 w-full h-screen bg-black/45 z-30 flex items-center justify-center">
            <TourCarousel phaseList={selfDemoList} onClose={() => setIsDemoClicked(false)}/>
        </div>
        )
      }
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
            onClick={() => setIsDemoClicked(true)}
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
