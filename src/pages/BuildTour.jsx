import React, { useState } from "react";

const BuildTour = () => {
    const [step, setStep] = useState(1);
  const [phaseList, setPhaseList] = useState([
    { title: "lorem2", image: "lorem2", description: "ashgjabgagj" },
    { title: "lorem2", image: "lorem2", description: "ashgjabgagj" },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    imagePreview: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        imagePreview: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
    // Push new phase to list
    setPhaseList((prev) => [
      ...prev,
      {
        title: formData.title,
        description: formData.description,
        image: formData.imagePreview || "No preview",
      },
    ]);
    setFormData({
      title: "",
      description: "",
      image: null,
      imagePreview: null,
    });
    setStep((prev) => prev + 1);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Build Your Tour</h1>

      <section className="w-[70%] bg-white h-120 rounded-lg shadow-lg flex items-center justify-between">
        <div className="w-200 h-full border-r-2 border-gray-200 mr-10 flex flex-col justify-center items-center">
          <div className="w-full h-full overflow-y-auto">
            {phaseList.map((phase, index) => (
              <div key={index} className="p-4 border-b last:border-b-0">
                <h2 className="text-xl font-semibold">{phase.title}</h2>
                <p>{phase.description}</p>
                {phase.image && (
                  <img
                    src={phase.image}
                    alt="uploaded"
                    className="w-24 h-24 object-cover mt-2 rounded-md"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-6 h-full w-full"
        >
          <div className="w-full flex justify-between">
            <h1 className="text-3xl font-bold">Step-{step}</h1>
            <button
              type="submit"
              className="w-30 h-10 bg-black text-white rounded-md"
            >
              Add Step
            </button>
          </div>
          <label className="font-semibold ">Title:</label>
          <input
            type="text"
            className="h-10 border-2 px-2"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
          />

          <label className="font-semibold">Description:</label>
          <textarea
            rows="4"
            cols="50"
            placeholder="Enter description here..."
            className="border-2 px-2 py-1"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
          ></textarea>

          <label className="font-semibold">Image:</label>
          <input
            type="file"
            accept="image/*"
            className="border-2 p-2"
            onChange={handleImageChange}
          />

          {formData.imagePreview && (
            <img
              src={formData.imagePreview}
              alt="Preview"
              className="w-32 h-32 object-cover mt-2 rounded-md"
            />
          )}
        </form>
      </section>
    </div>
  );
};

export default BuildTour;
