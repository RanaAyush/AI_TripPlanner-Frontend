import { Search, Star, ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const TopSights = () => {
  const sights = [
    {
      id: 1,
      title: "Museum of Goa",
      description: "Learn more about Panaji's history and culture on this interesting two-hour walking tour of th...",
      rating: 4.4,
      image: "/api/placeholder/300/200",
      date: "Day 1, Aug 16th"
    },
    {
      id: 2,
      title: "Indian Naval Aviation Museum",
      description: "Hop into the saddle and explore pretty Divar island with ease on this e-bike sightseeing to...",
      rating: 4.4,
      image: "/api/placeholder/300/200",
      date: "Day 1, Aug 16th"
    }
  ];

  // Repeat the sights array to create 12 items
  const allSights = [...sights, ...sights, ...sights, ...sights, ...sights, ...sights];

  return (
    <div className="max-w-7xl mx-auto p-6 my-5">
      <h1 className="text-2xl font-semibold mb-6">Top sights in Goa</h1>
      
      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="search"
          className="w-full max-w-md bg-gray-100 rounded-full py-3 pl-12 pr-4 outline-none"
        />
      </div>

      {/* Sights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allSights.map((sight, index) => (
          <Card key={`${sight.id}-${index}`} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <img 
                  src={sight.image}
                  alt={sight.title}
                  className="w-full h-48 object-cover"
                />
                {sight.title.includes('Naval') && (
                  <div className="absolute top-2 right-2">
                    <img 
                      src="/api/placeholder/32/32" 
                      alt="badge"
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-2">{sight.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{sight.description}</p>
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      className={`w-4 h-4 ${star <= Math.floor(sight.rating) ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="text-sm ml-1">{sight.rating}</span>
                </div>
                <button className="w-full flex items-center justify-between border rounded-lg px-4 py-2 text-sm">
                  {sight.date}
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center mt-8">
        <button className="px-6 py-2 text-gray-600 hover:text-gray-800">
          Load More
        </button>
      </div>
    </div>
  );
};

export default TopSights;