import { ChevronLeft, ChevronRight, MapPin, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import ItineraryDay from './ItineraryDay';

const TripDetails = ({ tripData }: any) => {
    const [hotelOptions, sethotelOptions] = useState([]);
    const { itinerary } = tripData.tripData;
    useEffect(() => {
        // console.log(tripData.tripData?.hotelOptions);
        sethotelOptions(tripData.tripData?.hotelOptions);

    }, [tripData])

    const [currentSlide, setCurrentSlide] = useState(0);

    // Handler to move to the previous slide
    const handlePrev = () => {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
    };

    // Handler to move to the next slide
    const handleNext = () => {
        setCurrentSlide((prev) =>
            Math.min(prev + 1, Math.ceil(hotelOptions.length / 2) - 1)
        );
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2 md:gap-6 md:p-4 md:px-24 mx-auto">
            {/* left Column - Itinerary */}
            <div className="w-full">
                {Object.entries(itinerary)
                    .map(([dayKey, dayDetails]) => (
                        <ItineraryDay key={dayKey} dayKey={dayKey} dayDetails={dayDetails} />
                    ))}
            </div>

            {/* Right Column - Hotels */}
            <div className="w-full">
                <h2 className="text-2xl font-semibold mb-2">Place to stay</h2>
                <p className="text-gray-600 mb-4">We've also recommended some places to stay during your trip.</p>

                <div className="relative overflow-hidden">
                    {/* Carousel Container */}
                    <div
                        className="flex gap-4 transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(-${currentSlide * 60}%)`,
                            width: `${hotelOptions.length * 50}%`, // Adjust width dynamically
                        }}
                    >
                        {hotelOptions.map((hotel, index) => (
                            <div
                                key={index}

                                style={{ flexBasis: "35%" }}
                            >
                                <Card className="w-full cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">
                                    <CardContent className="p-0">
                                        <img
                                            src={hotel?.hotelImageUrl || '/tokyo.jpg'}
                                            alt={hotel.hotelName}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-4">
                                            <h3 className="font-semibold">{hotel.hotelName.substring(0,30)}</h3>
                                            <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                                                <Star className="w-4 h-4 fill-current" />
                                                <span>{hotel.rating}-Star Hotel</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                                <MapPin className="w-4 h-4" />
                                                <span>
                                                    {hotel.hotelAddress.substring(0, 25)}...
                                                </span>
                                            </div>
                                            <div className="mt-2 font-medium">$ {hotel.price} Per Night</div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    {currentSlide > 0 && (
                        <button
                            onClick={handlePrev}
                            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 z-10"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                    )}
                    {currentSlide < Math.ceil(hotelOptions.length / 2) - 1 && (
                        <button
                            onClick={handleNext}
                            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 z-10"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    )}
                </div>
                <div className="mt-4">
                    Google maps here
                </div>
            </div>

        </div>
    );
};



export default TripDetails;