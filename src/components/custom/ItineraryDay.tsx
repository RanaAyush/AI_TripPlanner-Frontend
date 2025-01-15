import { ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { useState } from 'react';
import DayPlacesCard from './DayPlacesCard';
import { CalendarRange } from 'lucide-react';

const ItineraryDay = ({ dayKey, dayDetails }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCollapse = () => setIsOpen((prev) => !prev);

    return (
        <div className="mb-6">
            {/* Header - Collapsible */}
            <div className="bg-green-50 p-4 rounded-lg mb-4 cursor-pointer" onClick={toggleCollapse}>
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold capitalize">
                        {dayKey.replace(/day/, "Day ")} - {dayDetails?.theme}
                    </h3>
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
            </div>

            {/* Collapsible Content */}
            <div
                className={`transition-all duration-300 overflow-hidden ${isOpen ? "max-h-full opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="space-y-4 px-4 ">
                    <div className='flex gap-2 font-semibold mt-1 text-gray-400'>
                        <CalendarRange className="w-4 h-4" />
                        <h3 className='flex font-semibold text-sm'>Date - {dayDetails.date}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400 font-semibold mt-1">
                        <Clock className="w-4 h-4" />
                        <span>{dayDetails.bestTimeToVisit}</span>
                    </div>
                    {dayDetails.activities.map((place, index) => (
                        <DayPlacesCard
                            key={index}
                            place={place}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ItineraryDay