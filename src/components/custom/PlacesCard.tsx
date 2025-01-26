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
    <div className="container mx-auto px-4 py-6 md:px-28">
      {/* Buttons Section */}
      <div className="flex flex-wrap items-center justify-center md:justify-start mb-8 bg-black p-3 rounded-full w-full lg:w-3/4 xl:w-1/2">
        <div className="flex flex-row flex-wrap gap-2 justify-center sm:justify-start w-full">
          {Object.keys(images).map((location) => (
            <button
              key={location}
              onClick={() => handleLocationChange(location)}
              className={`px-4 py-2 rounded-full font-semibold text-lg sm:text-md whitespace-nowrap outline-none transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white ${
                currentLocation === location
                  ? 'bg-white text-black hover:bg-gray-100'
                  : 'bg-black text-white hover:bg-gray-500'
              }`}
            >
              {location}
            </button>
          ))}
        </div>
      </div>

      {/* Image Section */}
      <div className="relative w-full max-w-5xl mx-auto">
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