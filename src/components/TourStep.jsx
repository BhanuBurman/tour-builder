
import { motion } from "framer-motion";

export default function TourStep({ step }) {
  return (
    <motion.div
      className="p-6 bg-gray-100 rounded-xl shadow-md"
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <img src={step.image} alt={step.title} className="w-full rounded-md mb-4" />
      <h3 className="text-xl font-bold">{step.title}</h3>
      <p className="text-gray-700">{step.description}</p>
    </motion.div>
  );
}
