import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "../ui/card";
// @ts-ignore
import STRIPI_API_ENDPOINT from '../../utils/constants.js';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"


const Testimonials = () => {
  const { toast } = useToast();

  const renderStars = (rating: number): JSX.Element[] => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className="text-orange-400 h-1 w-5 font-semibold text-lg">
        {index + 1 <= rating ? "★" : index + 0.5 === rating ? "★" : "☆"}
      </span>
    ));
  };
  const [TestimonialsData, setTestimonialsData] = useState([]);
  const [isSmallDevice, setIsSmallDevice] = useState(false);
  const colors = ['#ECEBFD', '#EDF4F3', '#E0EAFA'];
  const cardlines = ['/cardlines/test1.png', '/cardlines/test2.png', '/cardlines/test3.png'];

  const getAllTestimonials = async () => {
    try {
      const response = await axios.get(`${STRIPI_API_ENDPOINT}/api/testimonials?populate=*`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setTestimonialsData(response.data?.data);
      // console.log(response.data?.data);

    } catch (error) {
      toast({
        variant: "destructive",
        title: 'Sorry!',
        description: "falied to fetch testimonials : Stripi seems offline",
      })
    }
  };

  useEffect(() => {
    getAllTestimonials();
    const handleResize = () => {
      setIsSmallDevice(window.innerWidth < 768); // Consider small devices as width < 768px
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);

  // Handler to move to the previous slide
  const handlePrev = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  // Handler to move to the next slide
  const handleNext = () => {
    const maxSlide =
      isSmallDevice
        ? TestimonialsData.length - 1
        : Math.ceil(TestimonialsData.length / 2) - 1;
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-12">
      <h1 className="text-4xl font-semibold text-center mb-12 animate-right">What people are saying</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative animate-right overflow-hidden">
        <div
          className="flex gap-6 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * (isSmallDevice ? 25 : 60)}%)`,
            width: `${TestimonialsData.length * (isSmallDevice ? 100 : 105)}%`,
          }}>
          {TestimonialsData.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out relative overflow-hidden" style={{ backgroundColor: colors[index % 3], flexBasis: "35%" }}>

              <div className='absolute inset-0'>
                <img src={cardlines[index % 3]} alt="background" className="w-full h-full object-cover" />
              </div>

              <CardContent className="p-6 relative z-10"> {/* Added z-10 to keep content above background image */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <img src={`${STRIPI_API_ENDPOINT}${testimonial?.country_flag?.url}`} alt="flag" className='w-10 h-6' />
                  </div>
                  <div className="flex">{renderStars(testimonial.ratings)}</div>
                </div>

                <p className="text-gray-700 mb-6 min-h-[80px]">{testimonial.description}</p>

                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 overflow-hidden"> {/* Added overflow-hidden */}
                    <img src={`${STRIPI_API_ENDPOINT}${testimonial?.user_image?.url}`} alt="profile" className='w-full h-full object-cover rounded-full' />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author_name}</p>
                    {testimonial.review_date && (
                      <p className="text-sm text-gray-500">{testimonial.review_date}</p>
                    )}
                  </div>
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
        {currentSlide < (isSmallDevice ? TestimonialsData.length - 1 : Math.ceil(TestimonialsData.length / 2) - 1) && (
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Testimonials;