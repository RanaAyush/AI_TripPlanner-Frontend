// import React from 'react';
import { LightbulbIcon, HeartIcon, Globe2Icon } from "lucide-react";

const AboutUsSection = () => {
    return (
        <div className="container mx-auto px-4 py-16 space-y-40">
            {/* Top section with circular images */}
            <div className="relative h-[500px] max-w-6xl mx-auto">
                {/* Center content */}
                <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 text-center z-10 w-96">
                    <h1 className="text-5xl font-bold mb-4">About Us</h1>
                    <p className="text-gray-400">
                        <span className="text-gray-600 font-semibold">Hola Trip</span> your ultimate travel companion designed to make planning your dream vacation easier, faster, and more personalized than ever before.
                    </p>
                </div>

                {/* Circular images arrangement */}
                <div className="absolute w-full h-full">
                    {/* Large Louvre image */}
                    <img
                        src="/aboutImg/Vector1.png"
                        alt="line"
                        className="absolute hidden md:flex left-[5%] md:left-[9%] transform rotate-[-5deg] -top-[18%] md:-top-[22%] w-[80%] md:w-[69%]"
                    />
                    <div className="absolute left-[-2%] md:-left-[11%] top-[5%] md:top-[2%] w-[20vw] md:w-[25vw] h-[20vh] md:h-[25vh] rounded-full overflow-hidden">
                        <img
                            src="/aboutImg/about1.png"
                            alt="Louvre Museum"
                            className="w-full h-full object-contain"
                        />
                    </div>

                    {/* Small cliff image */}
                    <img
                        src="/aboutImg/Vector3.png"
                        alt="line"
                        className="absolute -left-5 transform rotate-[3deg] top-20 md:top-28 hidden md:flex"
                    />
                    <div className="absolute left-16 md:left-20 bottom-36 md:bottom-20 w-16 md:w-24 h-16 md:h-24 rounded-full overflow-hidden">
                        <img
                            src="/aboutImg/about4.png"
                            alt="Cliff view"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Medium Hollywood sign */}
                    <img
                        src="/aboutImg/Vector2.png"
                        alt="line"
                        className="absolute right-32 md:right-64 transform rotate-[5deg] top-[18rem] md:top-[23rem] hidden md:flex"
                    />
                    <div className="absolute left-1/3 bottom-5 md:bottom-0 translate-x-[-50%] w-28 md:w-36 h-28 md:h-36 rounded-full overflow-hidden">
                        <img
                            src="/aboutImg/about2.png"
                            alt="Hollywood sign"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Small mountain image */}
                    <div className="absolute right-[-2%] md:-right-10 top-32 md:top-40 w-24 md:w-32 h-24 md:h-32 rounded-full overflow-hidden">
                        <img
                            src="/aboutImg/about6.png"
                            alt="Mountain view"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Large temple image */}
                    <div className="absolute right-16 md:right-24 -top-8 md:-top-10 w-36 md:w-44 h-36 md:h-44 rounded-full overflow-hidden">
                        <img
                            src="/aboutImg/about5.png"
                            alt="Temple"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="absolute right-16 md:right-48 top-60 md:top-72 w-20 md:w-24 h-20 md:h-24 rounded-full overflow-hidden">
                        <img
                            src="/aboutImg/about3.png"
                            alt="Temple"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>



            </div>

            {/* Values section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                {/* Innovation */}
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-orange-100 rounded-lg flex items-center justify-center">
                        <LightbulbIcon className="w-8 h-8 text-orange-500" />
                    </div>
                    <h3 className="text-xl font-semibold">Innovation</h3>
                    <p className="text-gray-600">
                        Continuously pushing the boundaries of technology to improve our platform.
                    </p>
                </div>

                {/* Customer Focus */}
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-red-100 rounded-lg flex items-center justify-center">
                        <HeartIcon className="w-8 h-8 text-red-500" />
                    </div>
                    <h3 className="text-xl font-semibold">Customer Focus</h3>
                    <p className="text-gray-600 px-10">
                        Putting our users at the heart of everything we do.
                    </p>
                </div>

                {/* Community */}
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-blue-100 rounded-lg flex items-center justify-center">
                        <Globe2Icon className="w-8 h-8 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-semibold">Community</h3>
                    <p className="text-gray-600 px-10 ">
                        Building a supportive and inspiring community of travelers.
                    </p>
                </div>
            </div>

            <div className="mx-auto px-4 py-4 max-w-6xl">
                <div className="grid grid-cols-12 gap-20 mb-24 items-center">
                    <div className="col-span-8 md:col-span-4 bg-gray-200 aspect-square rounded-lg">
                        <img
                            src="/aboutImg/vision.jpg"
                            alt="Vision illustration"
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                    <div className="col-span-8 md:col-span-8 space-y-4">
                        <h2 className="text-4xl font-bold">Our vision</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Our vision is to become the go-to platform for travel enthusiasts worldwide,
                            fostering a community of explorers who seek memorable and enriching experiences.
                            We strive to continuously innovate and enhance our services to make travel
                            planning more intuitive and enjoyable.
                        </p>
                    </div>
                </div>

                {/* Mission Section */}
                <div className="grid grid-cols-12 gap-20 mb-24 items-center ">
                    <div className="col-span-8 md:col-span-8 space-y-4">
                        <h2 className="text-4xl font-bold">Mission</h2>
                        <p className="text-gray-600 leading-relaxed">
                            At Hola Trip, our mission is to revolutionize the way people plan their travels
                            by leveraging advanced AI technology. We aim to provide personalized, hassle-free
                            trip planning that caters to every traveler's unique preferences and needs.
                        </p>
                    </div>
                    <div className="col-span-8 md:col-span-4 bg-gray-200 aspect-square rounded-lg">
                        <img
                            src="/aboutImg/mission.jpg"
                            alt="Mission illustration"
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                </div>


                {/* Story Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="md:order-2">
                        <h2 className="text-4xl font-bold mb-4">Our Story</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Hola Route was founded in 2024 by a group of passionate travelers and tech
                            enthusiasts. Frustrated by the complexities of trip planning, we set out to
                            create a solution that combines cutting-edge AI with a deep love for travel.
                            From humble beginnings, we've grown into a dedicated team committed to helping
                            you embark on your next adventure with ease.
                        </p>
                    </div>
                    <div className="md:order-1">
                        <img
                            src="/aboutImg/story.png"
                            alt="Team of travelers"
                            className="w-2/3 max-w-md mx-auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsSection;