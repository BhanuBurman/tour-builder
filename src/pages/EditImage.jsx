import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditImage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    imagePreview,
    toolTips = [],
    title = "",
    description = "",
    image = null,
  } = location?.state || {};

  const [localTooltips, setLocalTooltips] = useState(toolTips);
  const imageRef = useRef(null);

  const handleImageClick = (e) => {
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const text = prompt("Enter tooltip text:");
    if (!text) return;

    const newTooltip = {
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      text,
    };

    handleTooltipChange(newTooltip);
  };

  const handleTooltipChange = (value) => {
    const updatedTooltips = [...localTooltips, value];
    setLocalTooltips(updatedTooltips);
  };

  return (
    <div className="relative w-full h-screen border-2 flex justify-center items-center flex-col mt-10 bg-gray-200">
      <div className="w-120 h-10 bg-white my-2 rounded-lg flex justify-between items-center px-5">
        <p className="text-lg">Click at point in the image to add a tooltip</p>
        <button
          className="bg-green-600 px-4 py-1 rounded-md text-white cursor-pointer"
          onClick={() =>
            navigate("/build", {
              state: {
                imagePreview,
                toolTips: localTooltips,
                title,
                description,
                image,
              },
            })
          }
        >
          Save
        </button>
      </div>
      <div className="image_preview overflow-hidden bg-white p-4 rounded-lg shadow-xl h-[600px] flex flex-col justify-start">
        {imagePreview ? (
          <div className="relative w-full h-full flex justify-center items-center">
            <img
              src={imagePreview}
              ref={imageRef}
              onClick={handleImageClick}
              className="rounded mb-3 w-[90%] h-100 object-cover mx-auto"
              alt="Annotatable"
            />
            {localTooltips.map((tooltip, index) => (
              <div
                key={index}
                className="absolute bg-blue-600 h-7 text-white text-xs px-2 py-1 rounded shadow flex flex-col justify-center items-center"
                style={{
                  top: `${tooltip.y}%`,
                  left: `${tooltip.x}%`,
                  transform: "translate(-60%, -170%)",
                }}
              >
                <p className="mb-1">{tooltip.text}</p>
                <p className="w-0 h-0  -mb-3 border-l-10 border-r-10 border-t-10 border-l-transparent border-r-transparent border-t-blue-600"></p>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default EditImage;
