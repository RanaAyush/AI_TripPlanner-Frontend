import React, { useState } from 'react';

interface Images {
  [key: string]: string;
}

const PlacesCard: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<string>('Paris');

  const images: Images = {
    Paris: '/paris.png',
    California: '/california.jpg',
    Spain: '/spain.jpg',
    Bali: '/bali.jpg',
    Tokyo: '/tokyo.jpg',
  };

  const handleLocationChange = (location: string) => {
    setCurrentLocation(location);
  };

  return (
    <div className="flex flex-col px-4 md:px-24 py-6">
      {/* Buttons Section */}
      <div className="mt-2 flex flex-wrap gap-0 md:gap-4 justify-center md:justify-start mb-10 bg-black p-4 rounded-full w-full md:w-[50%]">
        {Object.keys(images).map((location) => (
          <button
            key={location}
            onClick={() => handleLocationChange(location)}
            className={`px-4 py-2 rounded-full font-semibold text-md outline-none transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white ${
              currentLocation === location
                ? 'bg-white text-black hover:bg-gray-100'
                : 'bg-black text-white hover:bg-gray-500'
            }`}
          >
            {location}
          </button>
        ))}
      </div>

      {/* Image Section */}
      <div className="relative w-full max-w-5xl">
        <img
          src={images[currentLocation]}
          alt={currentLocation}
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default PlacesCard;
