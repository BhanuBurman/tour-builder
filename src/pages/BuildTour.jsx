import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TourCarousel from "../components/TourCarousel";
import { RiDeleteBin6Fill } from "react-icons/ri";

const BuildTour = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isCreateClicked, setIsCreateClicked] = useState(false);
  const [step, setStep] = useState(1);
  const [phaseList, setPhaseList] = useState([]);
  const [formData, setFormData] = useState({
    title: location.state?.title || "",
    description: location.state?.description || "",
    image: null,
    imagePreview: location.state?.previewImage || null,
    toolTips: location.state?.toolTips || [],
  });

  useEffect(() => {
    const storedPhaseList = localStorage.getItem("phaseList");
    if (storedPhaseList) {
      setPhaseList(JSON.parse(storedPhaseList));
    } else {
      setPhaseList([]);
    }
  }, []);

  useEffect(() => {
    if (location.state && location.state.toolTips) {
      setFormData((prev) => ({
        ...prev,
        toolTips: location.state.toolTips,
        imagePreview: location.state.imagePreview || prev.imagePreview,
      }));
      console.log("after catching from edit: ", location.state.toolTips);
    } else if (
      location.state &&
      (location.state.title || location.state.description)
    ) {
      setFormData((prev) => ({
        ...prev,
        ...location.state,
      }));
    }
  }, [location.state]);


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
    const newEntry = {
      title: formData.title,
      description: formData.description,
      image: formData.imagePreview || "No preview",
      toolTips: formData.toolTips,
    };

    const updatedPhaseList = [...phaseList, newEntry];
    setPhaseList(updatedPhaseList);
    localStorage.setItem("phaseList", JSON.stringify(updatedPhaseList));
    setFormData({
      title: "",
      description: "",
      image: null,
      imagePreview: null,
      toolTips: [],
    });
    setStep((prev) => prev + 1);
  };

  const handleDeleteListItem = (index) => {
    const updatedPhaseList = phaseList.filter((_, i) => i !== index);
    setPhaseList(updatedPhaseList);
    localStorage.setItem("phaseList", JSON.stringify(updatedPhaseList));
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {isCreateClicked && (
        <div className="tour_overlay absolute top-0 left-0 w-full h-screen bg-black/45 z-30 flex items-center justify-center">
          <TourCarousel
            phaseList={phaseList}
            onClose={() => setIsCreateClicked(false)}
          />
        </div>
      )}
      <h1 className="text-3xl font-bold mb-6">Build Your Tour</h1>
      <section className="w-[70%] bg-white h-120 rounded-lg shadow-lg flex items-center justify-between">
        <div className="w-200 h-full border-r-2 border-gray-200 mr-10 flex flex-col justify-center items-center">
          <div className="w-full h-full overflow-y-auto">
            {phaseList.length !== 0 ? (
              phaseList.map((phase, index) => (
                <div className="flex justify-between items-center border-b last:border-b-0 w-120" key={index}>
                  <div className="p-4 w-full overflow-hidden whitespace-nowrap text-ellipsis">
                    <h2 className="text-xl font-semibold overflow-hidden whitespace-nowrap text-ellipsis">{phase.title}</h2>
                    <p className="overflow-hidden whitespace-nowrap text-ellipsis">{phase.description}</p>
                  </div>
                  <RiDeleteBin6Fill 
                  className="text-3xl m-2 text-red-600"
                  onClick={() => handleDeleteListItem(index)}
                  />
                </div>
              ))
            ) : (
              <div className="p-4 text-center">
                <p className="text-gray-500">No steps added yet.</p>
              </div>
            )}
          </div>
          <div className="w-full flex justify-center mt-4">
            <button
              onClick={() => setIsCreateClicked(true)}
              className="bg-black w-40 text-white px-4 py-2 rounded-md mb-3"
            >
              Create
            </button>
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
              className="w-25 h-10 bg-black text-white rounded-md"
            >
              Add Step
            </button>
          </div>
          <label className="font-semibold ">Title:</label>
          <input
            type="text"
            className="h-10 border-2 px-2"
            value={formData.title}
            placeholder="Enter title here..."
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
            className="w-50 border-2 bg-gray-500 text-white p-2 rounded-md"
            onChange={handleImageChange}
          />

          {formData.imagePreview && (
            <div className="text-sm  mt-2 flex items-center gap-6">
              {/* <img
                src={formData.imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover mt-2 rounded-md"
              /> */}
              <button
                className="bg-green-500 p-3 h-10 w-20 rounded-md text-white text-2xl flex items-center justify-center"
                type="button"
                onClick={() =>
                  navigate("/edit-image", {
                    state: {
                      ...formData,
                    },
                  })
                }
              >
                Edit
              </button>
            </div>
          )}
        </form>
      </section>
    </div>
  );
};

export default BuildTour;
