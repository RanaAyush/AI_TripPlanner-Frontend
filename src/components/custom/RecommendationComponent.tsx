import { useEffect, useState } from 'react';
import { Card, CardContent } from '../ui/card'
import { getPlaceImage } from '@/service/ImagesAPI';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { chatSession } from '@/service/AIModel';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebase';
import Loader from "../loader/Loader"

const RecommendationComponent = ({destination}:any) => {
    const [imageUrl, setImageUrl] = useState('');
    const { toast } = useToast()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const fetchImageUrl = async () => {
        setImageUrl('');
        const image = await getPlaceImage(destination.location);
        if (image) {
          setImageUrl(image || '');
        } else {
          setImageUrl('');
        }
    };

    const handleGenerateTrip = async () => {
        setLoading(true);

        const prompt = `Generate Travel Plan for Location: ${destination.location || "India"}, for ${destination.days || "2"} Days for ${destination?.people || "2"} people with a ${destination.budget || "Standard"} budget, start date is tommorow. Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions, and suggest itinerary with placeName, travelling timestamps, dates , Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit, also give some information about ${destination.location  || "India"} including it's image url, description, emergency numbers, life quality indices in numbers like -\n Quality of life index\n124.33\nSafety index\n53.31\nTraffic commute time index\n48.14\nPollution index\n48.54\nPurchasing power index\n43.82\nProperty price to income ratio\n10.4\nCost of living index\n22.05\nHealth care index\n63.38\nClimate index\n68.49\nalso suggest some activities to enjoy there including their name, description, ratings image url, booking url.\n all in JSON format.`;

        const res = await chatSession.sendMessage(prompt);
        setLoading(false);
        toast({
            description: "Hurray, your trip generated successfully!🎊",
        })
        saveAITrip(res?.response?.text());
        
    };
    const saveAITrip = async (tripData: string) => {
        const docId = Date.now().toString();
        const user = JSON.parse(localStorage.getItem('user') || "");
        await setDoc(doc(db, "AITrips", docId), {
            tripData: JSON.parse(tripData),
            id: docId,
            userEmail: user?.email,
        });
        navigate('/view-trip/'+ docId);
    };

    useEffect(()=>{
        destination&&fetchImageUrl();
    },[])
    return (
        <>
            {loading && <Loader />}
            <Card className="overflow-hidden shadow-none cursor-pointer hover:scale-105 hover:shadow-md transition-all" onClick={handleGenerateTrip}>
                <CardContent className="p-0">
                    <div className="relative">
                        <img
                            src={imageUrl || '/paris.png'}
                            alt={destination.location}
                            className="w-full h-52 object-cover"
                        />
                    </div>
                    <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{destination.location}</h3>
                        <p className="text-sm text-gray-600 mb-2">Best time: {destination.bestTimeToVisit}</p>
                        <p className="text-sm text-gray-600 mb-2">Budget: {destination.budget}</p>

                        <h4 className="font-medium mt-3 mb-1">Hotels:</h4>
                        <ul className="text-sm">
                            {destination.hotels?.slice(0, 2).map((hotel: any, idx: number) => (
                                <li key={idx} className="mb-1">{hotel.name} - {hotel.priceRange}</li>
                            ))}
                        </ul>

                        <h4 className="font-medium mt-3 mb-1">Activities:</h4>
                        <ul className="text-sm">
                            {destination.activities?.slice(0, 2).map((activity: any, idx: number) => (
                                <li key={idx} className="mb-1">{activity.name}</li>
                            ))}
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default RecommendationComponent