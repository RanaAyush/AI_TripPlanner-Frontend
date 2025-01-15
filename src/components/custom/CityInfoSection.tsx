import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { FaInfoCircle, FaHeartbeat } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

const CityInfoSection = ({ locationInfo, activitiesToEnjoy }: any) => {
    const emergencyNumbers = locationInfo?.emergencyNumbers;
    const lifeQualityIndices = locationInfo.lifeQualityIndices;


    const formatLabel = (key: any) => {
        return key
            .replace(/([A-Z])/g, ' $1') // Add space before uppercase letters
            .replace(/^./, (str:string) => str.toUpperCase()) // Capitalize the first letter
    };

    // Create a new object with updated keys
    const updatedLifeQualityIndices = Object.entries(lifeQualityIndices).reduce<Record<string, typeof lifeQualityIndices[keyof typeof lifeQualityIndices]>>((acc, [key, value]) => {
        acc[formatLabel(key)] = value;
        return acc;
    }, {});
    

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isSmallDevice, setIsSmallDevice] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallDevice(window.innerWidth < 768); // Consider small devices as width < 768px
        };

        handleResize(); // Set initial value
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);

    }, []);

    // Handler to move to the previous slide
    const handlePrev = () => {
        setCurrentSlide((prev) => Math.max(isSmallDevice?(prev - 2.3):(prev-1), 0));
    };

    // Handler to move to the next slide
    const handleNext = () => {
        const maxSlide =
            isSmallDevice
                ? activitiesToEnjoy.length+1
                : Math.ceil(activitiesToEnjoy.length / 2);
        setCurrentSlide((prev) => Math.min(isSmallDevice?(prev + 2.3):(prev+1), maxSlide));
    };

    return (
        <div className="lg:max-w-2xl md:max-w-2xl max-w-[30rem] mx-auto p-6 space-y-8">
            {/* Emergency Numbers Section */}
            <section>
                <h2 className="flex items-center gap-2 font-medium mb-3 text-lg">
                    <FaInfoCircle className='w-5 h-5' />
                    Emergency Numbers
                </h2>
                <div className="space-y-1">
                    {Object.entries(emergencyNumbers).map(([service, number]: any) => (
                        <div key={service} className="text-sm">
                            {service.charAt(0).toUpperCase() + service.slice(1)} : {number}
                        </div>
                    ))}
                </div>
            </section>

            {/* Life Quality Indices Section */}
            <section>
                <h2 className="flex items-center gap-2 font-medium mb-3 text-lg">
                    <FaHeartbeat className='w-5 h-5' />
                    Life Quality Indices
                </h2>
                <div className="space-y-1">
                    {Object.entries(updatedLifeQualityIndices).map(([service, number]: any) => (
                        <div key={service} className="text-sm flex justify-between">
                            <span>{service}</span>
                            <span>{number}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Activities Section */}
            <section>
                <h2 className="font-medium mb-4">More Activity & Tickets</h2>
                <div className="relative overflow-hidden">
                    <div className="flex gap-4 transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(-${(currentSlide) * (isSmallDevice ? 25 : 60)}%)`,
                            width: `${activitiesToEnjoy.length * (isSmallDevice ? 25 : 50)}%`,
                        }}>
                        {activitiesToEnjoy.map((activity:any) => (
                            <Card key={activity.name} className="w-[300px] shrink-0">
                                <CardContent className="p-0">
                                    <img
                                        // src={activity.imageUrl}
                                        src={'/spain.jpg'}
                                        alt={activity.name}
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="font-medium text-sm mb-2">{activity.name}</h3>
                                        <p className="text-sm text-gray-600 mb-2">{activity.description.substring(0, 80)}...</p>
                                        <div className="flex items-center gap-1 mb-3">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`w-4 h-4 ${star <= Math.floor(activity.ratings) ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
                                                />
                                            ))}
                                            <span className="text-sm ml-1">{activity.ratings}</span>
                                        </div>
                                        <Button className="w-full py-2 rounded-lg" onClick={() => { window.open(activity.bookingUrl, '_blank', 'noopener,noreferrer'); }}>
                                            Book now
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    {currentSlide > 0 && (
                        <button
                            onClick={handlePrev}
                            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 z-10"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                    )}
                    {currentSlide < (isSmallDevice ? activitiesToEnjoy.length : Math.ceil(activitiesToEnjoy.length / 2) - 1) && (
                        <button
                            onClick={handleNext}
                            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 z-10"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </section>
        </div>
    );
};

export default CityInfoSection;