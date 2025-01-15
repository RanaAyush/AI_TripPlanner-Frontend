import { GoogleGenerativeAI} from "@google/generative-ai";
  
  const apiKey = import.meta.env.VITE_GOOGLE_AI_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, start date is 10 Jan 2025. Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions, and suggest itinerary with placeName, travelling timestamps, dates , Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit, also give some information about las vegas including it's image url, description, emergency numbers, life quality indices in numbers like -\n Quality of life index\n124.33\nSafety index\n53.31\nTraffic commute time index\n48.14\nPollution index\n48.54\nPurchasing power index\n43.82\nProperty price to income ratio\n10.4\nCost of living index\n22.05\nHealth care index\n63.38\nClimate index\n68.49\nalso suggest some activities to enjoy there including their name, description, ratings image url, booking url.\n all in JSON format."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"location\": \"Las Vegas\",\n  \"startDate\": \"2025-01-10\",\n  \"duration\": \"3 Days\",\n  \"budget\": \"Cheap\",\n  \"locationInfo\": {\n    \"imageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Las_Vegas_Strip_at_night.jpg/1200px-Las_Vegas_Strip_at_night.jpg\",\n    \"description\": \"Las Vegas, often known as 'Sin City,' is a world-renowned entertainment and gambling hub. It's famous for its extravagant resorts, vibrant nightlife, and a wide array of attractions, from world-class shows to stunning natural landscapes nearby. While known for its luxury, Las Vegas can also be explored on a budget with careful planning.\",\n    \"emergencyNumbers\": {\n      \"police\": \"911\",\n      \"fire\": \"911\",\n      \"ambulance\": \"911\"\n    },\n    \"lifeQualityIndices\": {\n      \"qualityOfLifeIndex\": 124.33,\n      \"safetyIndex\": 53.31,\n      \"trafficCommuteTimeIndex\": 48.14,\n      \"pollutionIndex\": 48.54,\n      \"purchasingPowerIndex\": 43.82,\n      \"propertyPriceToIncomeRatio\": 10.4,\n      \"costOfLivingIndex\": 22.05,\n      \"healthCareIndex\": 63.38,\n      \"climateIndex\": 68.49\n    }\n  },\n  \"hotelOptions\": [\n    {\n      \"hotelName\": \"Circus Circus Hotel & Casino\",\n      \"hotelAddress\": \"2880 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"price\": 50,\n      \"imageUrl\": \"https://www.circuscircus.com/wp-content/uploads/2023/04/Circus-Circus-Hotel.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.1374,\n        \"longitude\": -115.1647\n      },\n      \"rating\": 3.5,\n      \"description\": \"A budget-friendly option on the Strip, known for its family-friendly atmosphere and the Adventuredome indoor theme park. Offers basic but comfortable rooms.\"\n    },\n    {\n       \"hotelName\": \"The LINQ Hotel + Experience\",\n        \"hotelAddress\": \"3535 S Las Vegas Blvd, Las Vegas, NV 89109\",\n        \"price\": 70,\n        \"imageUrl\": \"https://www.caesars.com/content/dam/clv/Property/LINQ/hero/linq-hero.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1174,\n          \"longitude\": -115.1713\n        },\n        \"rating\": 4.0,\n        \"description\":\"Located at the center of the Strip, modern hotel with a lively atmosphere, the Linq Promenade, and High Roller Observation Wheel.\"\n      },\n    {\n      \"hotelName\": \"Excalibur Hotel & Casino\",\n      \"hotelAddress\": \"3850 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"price\": 60,\n      \"imageUrl\": \"https://assets.mgmresorts.com/content/dam/MGM/excalibur/property-landing/excalibur-exterior-hero-16x9.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.0986,\n        \"longitude\": -115.1723\n      },\n      \"rating\": 3.8,\n      \"description\": \"A castle-themed hotel on the southern end of the Strip, offering affordable rooms and family-friendly entertainment.\"\n    }\n  ],\n    \"itinerary\": {\n    \"day1\": {\n      \"date\": \"2025-01-10\",\n      \"theme\": \"Exploring the Strip\",\n      \"bestTimeToVisit\": \"Morning and Evening (cooler temperatures)\",\n      \"activities\": [\n        {\n          \"placeName\": \"Welcome to Las Vegas Sign\",\n          \"travellingTimestamp\": \"9:00 AM\",\n            \"timeToTravel\": \"10 minutes (depending on hotel location)\",\n          \"placeDetails\": \"Iconic sign marking the southern end of the Las Vegas Strip. A must-do for photos.\",\n          \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Welcome_to_Las_Vegas_Sign.jpg/1200px-Welcome_to_Las_Vegas_Sign.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.0908,\n            \"longitude\": -115.1723\n          },\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.5\n        },\n        {\n            \"placeName\": \"Bellagio Conservatory & Botanical Garden\",\n            \"travellingTimestamp\": \"11:00 AM\",\n            \"timeToTravel\": \"15 minutes\",\n          \"placeDetails\": \"Beautiful indoor garden with themed displays that change seasonally. Free to enter.\",\n          \"placeImageUrl\": \"https://www.bellagio.com/content/dam/MGM/bellagio/entertainment/conservatory/bellagio-conservatory-2022-spring-16x9.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1125,\n            \"longitude\": -115.1740\n          },\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.7\n        },\n        {\n          \"placeName\": \"Fountains of Bellagio\",\n          \"travellingTimestamp\": \"1:00 PM\",\n            \"timeToTravel\": \"5 minutes\",\n          \"placeDetails\": \"Spectacular water show set to music, visible from the street. Runs regularly throughout the day.\",\n          \"placeImageUrl\": \"https://www.bellagio.com/content/dam/MGM/bellagio/entertainment/fountains/bellagio-fountains-hero-16x9.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1123,\n            \"longitude\": -115.1736\n          },\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.8\n        },\n         {\n          \"placeName\": \"Explore The LINQ Promenade\",\n            \"travellingTimestamp\": \"3:00 PM\",\n             \"timeToTravel\": \"15 minutes\",\n          \"placeDetails\": \"Stroll through this outdoor entertainment district with shops, restaurants, and the High Roller observation wheel.\",\n          \"placeImageUrl\": \"https://www.caesars.com/content/dam/clv/Property/LINQ/hero/linq-promenade-hero-16x9.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1174,\n            \"longitude\": -115.1713\n          },\n          \"ticketPricing\": \"Free (for walking around)\",\n          \"rating\": 4.3\n        },\n        {\n          \"placeName\": \"Evening at Fremont Street Experience\",\n            \"travellingTimestamp\": \"6:00 PM\",\n             \"timeToTravel\": \"20 minutes\",\n          \"placeDetails\": \"Light show on a pedestrian mall in downtown Las Vegas. Offers free entertainment and a vibrant atmosphere.\",\n          \"placeImageUrl\": \"https://fremontstreetexperience.com/wp-content/uploads/2022/08/fremont-street-experience-vegas-main-street.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1700,\n            \"longitude\": -115.1420\n          },\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.6\n        }\n      ]\n    },\n        \"day2\": {\n      \"date\": \"2025-01-11\",\n      \"theme\": \"Nature and Cheap Eats\",\n        \"bestTimeToVisit\":\"Early Morning and Late Afternoon\",\n      \"activities\": [\n        {\n          \"placeName\": \"Red Rock Canyon National Conservation Area\",\n           \"travellingTimestamp\": \"9:00 AM\",\n            \"timeToTravel\": \"40 minutes\",\n          \"placeDetails\": \"Scenic drive with beautiful red rock formations and hiking trails. (Entrance fee applies per vehicle but walking around is free)\",\n          \"placeImageUrl\": \"https://www.blm.gov/sites/default/files/styles/16x9_1920/public/media/images/202311/Red_Rock_Canyon_DSC_0285.jpg?itok=92z-5b45\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1456,\n            \"longitude\": -115.4167\n          },\n           \"ticketPricing\": \"Entry Fee applicable to vehicles\",\n          \"rating\": 4.7\n        },\n          {\n          \"placeName\": \"In-N-Out Burger\",\n            \"travellingTimestamp\": \"1:00 PM\",\n            \"timeToTravel\": \"20 minutes\",\n          \"placeDetails\": \"Enjoy a classic and affordable American burger at this popular chain. Known for fresh ingredients and simple menu.\",\n          \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/In_N_Out_Burger_logo.svg/2560px-In_N_Out_Burger_logo.svg.png\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1248,\n            \"longitude\": -115.1723\n          },\n           \"ticketPricing\": \"Budget-friendly, meals around $10\",\n          \"rating\": 4.5\n        },\n        {\n          \"placeName\": \"High Roller Observation Wheel (optional - consider only if budget allows)\",\n           \"travellingTimestamp\": \"3:00 PM\",\n            \"timeToTravel\": \"15 minutes\",\n          \"placeDetails\": \"Take a 30-minute ride on one of the world’s tallest observation wheels for panoramic views of Las Vegas.\",\n          \"placeImageUrl\": \"https://www.caesars.com/content/dam/clv/Property/LINQ/hero/linq-high-roller-carousel-16x9.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1173,\n            \"longitude\": -115.1705\n          },\n           \"ticketPricing\": \"Tickets usually start from $25\",\n          \"rating\": 4.4\n        },\n           {\n          \"placeName\": \"Evening show at Fremont Street\",\n            \"travellingTimestamp\":\"6:00 PM\",\n             \"timeToTravel\": \"20 minutes\",\n          \"placeDetails\": \"Enjoy another vibrant light and music show at Fremont Street, featuring different themes and performances than on day 1.\",\n           \"placeImageUrl\": \"https://fremontstreetexperience.com/wp-content/uploads/2022/08/fremont-street-experience-vegas-main-street.jpg\",\n          \"geoCoordinates\": {\n              \"latitude\": 36.1700,\n              \"longitude\": -115.1420\n          },\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.7\n        }\n      ]\n    },\n         \"day3\": {\n      \"date\": \"2025-01-12\",\n      \"theme\": \"South Strip and Departure\",\n      \"bestTimeToVisit\":\"Morning for Sightseeing\",\n      \"activities\": [\n        {\n          \"placeName\": \"Mandalay Bay Beach (view from outside)\",\n            \"travellingTimestamp\": \"9:00 AM\",\n            \"timeToTravel\": \"15 minutes\",\n          \"placeDetails\": \"Take a look at the huge artificial beach and pool area at Mandalay Bay hotel from outside. Entry is usually restricted to hotel guests, but you can view it for free.\",\n          \"placeImageUrl\": \"https://assets.mgmresorts.com/content/dam/MGM/mandalay-bay/pool/mandalay-beach-16x9.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.0924,\n            \"longitude\": -115.1735\n          },\n           \"ticketPricing\": \"Free to view from outside\",\n          \"rating\": 4.3\n        },\n          {\n              \"placeName\": \"Excalibur Hotel and Castle Exploration\",\n               \"travellingTimestamp\": \"11:00 AM\",\n              \"timeToTravel\": \"5 minutes\",\n              \"placeDetails\": \"Explore the unique architecture and atmosphere of the Excalibur hotel, known for its medieval castle theme. Walk through common areas for a free peek.\",\n             \"placeImageUrl\": \"https://assets.mgmresorts.com/content/dam/MGM/excalibur/property-landing/excalibur-exterior-hero-16x9.jpg\",\n               \"geoCoordinates\": {\n                  \"latitude\": 36.0986,\n                  \"longitude\": -115.1723\n                },\n              \"ticketPricing\":\"Free\",\n                \"rating\":4.0\n          },\n        {\n          \"placeName\": \"Enjoy a Budget-Friendly Lunch\",\n           \"travellingTimestamp\":\"1:00 PM\",\n            \"timeToTravel\": \"10 minutes\",\n          \"placeDetails\": \"Check out food courts or casual dining spots for a cheap lunch options at either Excalibur or nearby hotel, or a fast food chain like subway.\",\n          \"placeImageUrl\": \"https://lh3.googleusercontent.com/p/AF1QipN7QjYpQ49v9k_0G3uKk0j_w7gK_82f4-z-n54=s680-w680-h510\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.0986,\n            \"longitude\": -115.1723\n          },\n           \"ticketPricing\": \"Variable (around $10-$15)\",\n          \"rating\": 4.2\n        },\n           {\n          \"placeName\": \"Departure\",\n            \"travellingTimestamp\": \"3:00 PM\",\n               \"timeToTravel\": \"Variable\",\n          \"placeDetails\": \"Head to the airport or your next destination. Allow enough time for travel to the airport.\",\n            \"placeImageUrl\":\"https://cdn.vectorstock.com/i/preview-1x/93/64/plane-leaving-at-sunset-flight-concept-travel-vector-46469364.jpg\",\n          \"geoCoordinates\": {\n             \"latitude\": 36.0800,\n                \"longitude\": -115.1522\n            },\n          \"ticketPricing\": \"N/A\",\n             \"rating\": 0\n        }\n      ]\n    }\n  },\n  \"activitiesToEnjoy\": [\n    {\n      \"name\": \"The Mob Museum\",\n      \"description\": \"Explore the history of organized crime in the United States through interactive exhibits and artifacts.\",\n      \"ratings\": 4.6,\n      \"imageUrl\": \"https://themobmuseum.org/wp-content/uploads/2015/03/mob_museum_exterior1.jpg\",\n      \"bookingUrl\": \"https://themobmuseum.org/tickets/\"\n    },\n    {\n      \"name\": \"Neon Museum\",\n      \"description\": \"See a collection of vintage Las Vegas signs, a fascinating look into the city's history.\",\n      \"ratings\": 4.7,\n      \"imageUrl\": \"https://neonmuseum.org/wp-content/uploads/2019/06/neon_main.jpg\",\n      \"bookingUrl\": \"https://www.neonmuseum.org/visit/tickets\"\n    },\n       {\n      \"name\":\"Hoover Dam\",\n      \"description\": \"Take a trip to see the amazing Hoover Dam and learn more about the engineering marvel.\",\n      \"ratings\": 4.8,\n       \"imageUrl\":\"https://media.cntraveler.com/photos/6204c36730f34e426fdbef8b/16:9/w_2560%2Cc_limit/Hoover-Dam_GettyImages-489524888.jpg\",\n       \"bookingUrl\":\"https://www.usbr.gov/lc/hooverdam/service/tours.html\"\n    },\n     {\n      \"name\": \"Stratosphere Tower\",\n      \"description\": \"Enjoy views of the city and several thrill rides at this iconic tower.\",\n      \"ratings\": 4.5,\n      \"imageUrl\": \"https://res.cloudinary.com/simpleview/image/upload/v1677261947/clients/lasvegas/09_stratosphere_02_skyjump_16_9_a4e3a9e1-901c-4d72-91d1-2a5047729971.jpg\",\n      \"bookingUrl\": \"https://stratlv.com/attractions\"\n    },\n    {\n     \"name\":\"Valley of Fire State Park\",\n     \"description\":\"Explore the ancient red rock formations and hiking trails of the Valley of Fire State Park\",\n     \"ratings\": 4.7,\n     \"imageUrl\":\"https://parks.nv.gov/media/cache/c6/69/c6696d9f9697d335f831317d6012c296.jpg\",\n      \"bookingUrl\":\"https://parks.nv.gov/parks/valley-of-fire\"\n    }\n  ]\n}\n```"},
          ],
        },
      ],
    });
  