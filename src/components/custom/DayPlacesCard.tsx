import { useState } from "react";
import { ChevronDown, ChevronUp, Clock, Star } from "lucide-react";
import { AiFillShop } from "react-icons/ai";

const DayPlacesCard = ({ place }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCollapse = () => setIsOpen((prev) => !prev);

    return (
        <div className="mb-4">
            {/* Header for Collapsible Section */}
            <div
                className="border-b-2 py-4 mx-4 cursor-pointer flex justify-between items-center"
                onClick={toggleCollapse}
            >
                <div className="flex gap-4 items-center">
                    <AiFillShop className="w-5 h-5" />
                    <h3 className="font-semibold">{place?.placeName}</h3>
                </div>
                <div className="flex gap-4 items-center">
                    <div className='bg-gray-100 rounded-full px-2 py-1 text-xs'>
                        <span>{place.travellingTimestamp}</span>

                    </div>
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
            </div>

            {/* Collapsible Content */}
            <div
                className={`transition-all duration-300 overflow-hidden ${isOpen ? "max-h-full opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="space-y-4 p-4">

                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        <div className="p-4">
                            <div className="flex justify-between gap-4">
                                <img
                                    // src={place.placeImageUrl || "/bali.jpg"}
                                    src={ "/bali.jpg"}
                                    alt={place.name}
                                    className="w-full h-48 object-cover rounded-lg mt-3"
                                />
                                <div className="my-auto">
                                    <h3 className="font-semibold">{place?.placeName}</h3>
                                    <p className="text-sm text-gray-600 mt-2">{place.placeDetails}</p>
                                    <div className="py-3">
                                        <p className="flex items-center gap-2 text-sm">
                                            <Star className="w-4 h-4 fill-current" />
                                            <span>{place.rating} - Star Rated</span>
                                        </p>
                                        <p>
                                            <span className="text-sm text-gray-500"><span className="font-semibold text-black">Price </span> - ${place.ticketPricing} per person</span>
                                        </p>
                                        <p>
                                            <span className="text-sm text-gray-500"><span className="font-semibold text-black">Travel Time </span> - {place.timeToTravel}</span>
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DayPlacesCard;
