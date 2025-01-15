const GuidInfo = () => {
    return (
      <section className="flex flex-col items-center text-center p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8">
          Create your plan within minutes!
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 relative">
          {/* SVG Path Passing Through Images */}
          <div className="hidden md:flex">
            <div className="flex justify-between w-full">
              <div className="w-4 h-4 bg-[#E13DFB] rounded-full absolute top-[5.6rem] left-[12rem] md:left-[35%] z-10"></div>
              <div className="w-4 h-4 bg-blue-600 rounded-full absolute top-[18rem] md:top-[24rem] left-[22rem] md:left-[70%] z-10"></div>
            </div>
            <img
              src="/curvey-Line.png"
              alt="line"
              className="hidden md:block absolute w-[50%] h-[60%] top-24 left-[10%] md:left-[28%]"
            />
          </div>
  
          {/* Choose Step */}
          <div className="flex flex-col items-center max-w-xs animate-blocks">
            <h3 className="font-bold text-lg my-6 md:my-14">CHOOSE</h3>
            <img
              src="/img1.png"
              alt="Choose Step"
              className="w-28 h-44 md:w-40 md:h-60 mb-4"
            />
            <p className="text-gray-600 text-sm mt-4 md:mt-10">
              Start your adventure by selecting your dream{" "}
              <span className="text-blue-600 font-bold italic">destination</span>.
              Our AI travel planner offers a wide range of options tailored to
              your preferences.
            </p>
          </div>
  
          {/* Customize Step */}
          <div className="flex flex-col items-center max-w-xs z-20 animate-blocks">
            <h3 className="font-bold text-lg my-6 md:my-14">CUSTOMIZE</h3>
            <img
              src="/img2.png"
              alt="Customize Step"
              className="w-28 h-44 md:w-40 md:h-60 mb-4"
            />
            <p className="text-gray-600 text-sm mt-4 md:mt-10">
              <span className="text-pink-600 italic font-bold">Personalize</span>{" "}
              your itinerary to match your interests and needs. Modify
              activities, accommodations, and transportation for a perfect fit.
            </p>
          </div>
  
          {/* Travel Step */}
          <div className="flex flex-col items-center max-w-xs animate-blocks">
            <h3 className="font-bold text-lg my-6 md:my-14">TRAVEL</h3>
            <img
              src="/img3.png"
              alt="Travel Step"
              className="w-28 h-44 md:w-40 md:h-60 mb-4"
            />
            <p className="text-gray-600 text-sm mt-4 md:mt-10">
              Embark on your journey with confidence, knowing every detail has
              been meticulously planned for a seamless{" "}
              <span className="text-green-400 italic font-bold">travel</span>{" "}
              experience.
            </p>
          </div>
        </div>
      </section>
    );
  };
  
  export default GuidInfo;
  