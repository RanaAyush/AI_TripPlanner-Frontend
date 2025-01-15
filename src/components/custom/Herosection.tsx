import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
// import { useState } from "react";

const Herosection = () => {
  // const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e: any) => {
    e.preventDefault();
    // setIsAnimating(true);

    // After animation completes, navigate to the new page
    // setTimeout(() => {
    //   navigate('/planner-plan');
    // }, 2000);
    navigate('/planner-plan');
  };
  return (

    <div className="relative flex flex-col items-center px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24 lg:mt-36 min-h-[calc(100vh-6rem)]">
      {/* Paper Plane Icon */}

      <div className="hidden lg:block absolute top-8 left-[22%] animate-fly">
        <img
          src="/travel_plane.png"
          alt="Paper Plane"
          className="w-12 sm:w-16 lg:w-20"
        />
      </div>

      {/* Highlighted Top Badge */}
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border-gray-300 border-2 max-w-full sm:max-w-fit">
        <span className="text-xs sm:text-sm font-semibold text-gray-600 whitespace-normal sm:whitespace-nowrap text-center typewriter">
          🌍 Explore the Beautiful world with AI
        </span>
      </div>

      {/* Main Heading */}
      <h1 className="text-center mt-4 sm:mt-6">
        <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
          Say Hi! To Your Own AI
        </span>
        <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mt-2">
          Trip Planner
        </span>
      </h1>

      {/* Description */}
      <p className="mt-4 text-base sm:text-lg text-gray-700 text-center px-4 font-semibold max-w-2xl mx-auto">
        <span className="block">Your personal trip planner and travel curator, creating custom</span>
        <span className="block">itineraries tailored to your interests and budget.</span>
      </p>

      {/* Button */}
      <div onClick={handleClick} className="mt-6 sm:mt-8">
        <div className="flex relative trip-btn p-[3px]">
          <Button className="flex items-center gap-2 bg-black text-white hover:bg-gray-800 px-4 sm:px-6 py-4 sm:py-6 rounded-lg shadow-lg text-sm sm:text-base">
            Create trip
            <img
              src="/magicpen.png"
              alt="magicpen"
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Herosection;