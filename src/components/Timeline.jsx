
import TourStep from "./TourStep";

export default function Timeline({ steps }) {
  return (
    <section className="p-10 space-y-10 bg-white min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8">Product Tour</h2>
      <div className="space-y-10">
        {steps.map((step, index) => (
          <TourStep key={index} step={step} />
        ))}
      </div>
    </section>
  );
}
