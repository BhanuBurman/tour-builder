import { motion } from "framer-motion";
import {  useNavigate } from "react-router-dom";
import bgImg from "../assets/bg-img.png";
import { useState } from "react";
import TourCarousel from "./TourCarousel";
import demo1 from "../assets/demo-1.png";
import demo2 from "../assets/demo-2.png";
import demo3 from "../assets/demo-3.png";

export default function HeroSection() {
  const navigate = useNavigate();
  const [isDemoClicked, setIsDemoClicked] = useState(false);

  const selfDemoList = [
  {
    title: "Start from Landing Page",
    image: demo1,
    description: "Kick off your journey on the Landing Page. Just click on the 'Build Tour' button to begin crafting a personalized product tour that sets the tone for an interactive user experience."
  },
  {
    title: "Create a tour",
    image: demo2,
    description: "Welcome to the Editor Page — the heart of your tour-building experience. Here, you can manage and organize all your steps with precision and ease. Use the step editor to input titles, descriptions, and visuals for each phase of your product journey. Create impactful, guided walkthroughs to elevate user onboarding. Easily review, reorder, or delete any of your added steps in the Phase List. This gives you full control over the flow and structure of the user tour you're building."
  },
  {
    title: "Add Tool tip",
    image: demo3,
    description: "Highlight key UI elements using intuitive tooltips. Guide users contextually with helpful overlays to ensure they never miss a critical feature."
  }
]


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
