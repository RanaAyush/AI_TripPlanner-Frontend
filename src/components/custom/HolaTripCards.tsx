import React from 'react';

const HolaTripCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 text-left">
      <div className="p-6 rounded-xl shadow-md hover:bg-blue-100 hover:border-2 border-blue-400 transition-colors duration-300 cursor-pointer animate-right">
        <div className="text-4xl my-6">
          <img src="/sideGIF/map.png" alt="icon" />
        </div>
        <h3 className="text-xl font-bold mb-4">Interactive Map</h3>
        <p className="text-gray-500 ">
          Explore your destination with our interactive map feature. Easily locate attractions, restaurants, and accommodations. Get real-time updates and directions to make navigating your trip a breeze.
        </p>
      </div>

      <div className="p-6 rounded-xl shadow-md hover:bg-orange-100 hover:border-2 border-orange-400 transition-colors duration-300 cursor-pointer animate-right">
        <div className="text-4xl my-6">
          <img src="/sideGIF/extension.png" alt="icon" />
        </div>
        <h3 className="text-xl font-bold mb-4">Itinerary Builder</h3>
        <p className="text-gray-500">
          Create a detailed itinerary with our intuitive builder. Plan your daily activities, schedule tours, and organize your travel plans. Customize your itinerary to suit your preferences and ensure a seamless travel experience.
        </p>
      </div>

      <div className="p-6 rounded-xl shadow-md hover:bg-green-100 hover:border-2 border-green-400 transition-colors duration-300 cursor-pointer animate-right">
        <div className="text-4xl my-6">
          <img src="/sideGIF/auto_stories.png" alt="icon" />
        </div>
        <h3 className="text-xl font-bold mb-4">Budget Planner</h3>
        <p className="text-gray-500">
          Keep your expenses in check with our budget planner. Set a budget for your trip and track your spending on accommodations, meals, activities, and more. Make informed decisions to stay within your budget while enjoying your vacation.
        </p>
      </div>

      <div className="p-6 rounded-xl shadow-md hover:bg-cyan-100 hover:border-2 border-cyan-400 transition-colors duration-300 cursor-pointer animate-right">
        <div className="text-4xl my-6">
          <img src="/sideGIF/group_add.png" alt="icon" />
        </div>
        <h3 className="text-xl font-bold mb-4">Collaboration Tools</h3>
        <p className="text-gray-500">
          Plan your trip with friends and family using our collaboration tools. Share your itinerary, exchange ideas, and coordinate plans effortlessly. Ensure everyone is on the same page for a fun and well-organized group trip.
        </p>
      </div>

      <div className="p-6 rounded-xl shadow-md hover:bg-purple-100 hover:border-2 border-purple-400 transition-colors duration-300 cursor-pointer animate-right">
        <div className="text-4xl my-6">
          <img src="/sideGIF/download_for_offline.png" alt="icon" />
        </div>
        <h3 className="text-xl font-bold mb-4">Offline Access</h3>
        <p className="text-gray-500">
          Access your travel plans anytime, even without an internet connection. Download your itinerary, maps, and essential information for offline use. Stay prepared and navigate your trip with confidence, no matter where you are.
        </p>
      </div>

      <div className="p-6 rounded-xl shadow-md hover:bg-red-100 hover:border-2 border-red-400 transition-colors duration-300 cursor-pointer animate-right">
        <div className="text-4xl my-6">
          <img src="/sideGIF/event_note.png" alt="icon" />
        </div>
        <h3 className="text-xl font-bold mb-2">Calendar Integration</h3>
        <p className="text-gray-500 ">
          Sync your travel plans with your personal calendar. Automatically add your itinerary to your preferred calendar app for easy access and reminders. Stay organized and never miss an activity or reservation during your trip.
        </p>
      </div>
    </div>
  );
};

export default HolaTripCards;